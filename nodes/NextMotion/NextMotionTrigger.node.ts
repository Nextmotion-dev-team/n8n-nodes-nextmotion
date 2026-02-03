import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { getClinics } from './listSearch/getClinics';
import { registerWebhook, deleteWebhook, WEBHOOK_EVENT_OPTIONS, generateWebhookSecret } from './shared/webhookHelpers';
import { UUID_VALIDATION } from './shared/descriptions';
import { nextMotionApiRequest } from './shared/transport';

export class NextMotionTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NextMotion Trigger',
		name: 'nextMotionTrigger',
		icon: 'file:../../icons/nextmotion.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Triggers workflow when NextMotion events occur (patient created, appointment updated, etc.)',
		defaults: {
			name: 'NextMotion Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'nextMotionApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Clinic',
				name: 'clinicId',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: true,
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getClinics',
							searchable: false,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						validation: UUID_VALIDATION,
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				description: 'The clinic to monitor for events',
			},
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'patient_create',
				options: WEBHOOK_EVENT_OPTIONS,
				description: 'The event type to trigger on',
			},
			{
				displayName: 'Additional Headers',
				name: 'headers',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Header',
						name: 'header',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Header name (Note: X-Webhook-Secret is reserved and auto-generated)',
								placeholder: 'e.g. X-Custom-Header',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Header value',
							},
						],
					},
				],
				description: 'Optional custom headers for webhook requests (in addition to auto-generated X-Webhook-Secret)',
			},
		],
	};

	methods = {
		listSearch: {
			getClinics,
		},
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId as string;

				if (!webhookId) {
					return false;
				}

				// Verify webhook still exists on the server
				try {
					await nextMotionApiRequest.call(
						this,
						'GET',
						`/open_api/v4/webhooks/${webhookId}`,
					);
					return true;
				} catch {
					// Webhook was deleted or doesn't exist
					delete webhookData.webhookId;
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const event = this.getNodeParameter('event') as string;
				const clinicId = this.getNodeParameter('clinicId', '', { extractValue: true }) as string;
				const headersCollection = this.getNodeParameter('headers', {}) as IDataObject;

				// Auto-generate a secure random secret
				const webhookSecret = generateWebhookSecret();

				// Build headers with secret
				const headers: Record<string, string> = {
					'X-Webhook-Secret': webhookSecret,
				};

				// Add any additional custom headers (skip reserved headers)
				if (headersCollection.header && Array.isArray(headersCollection.header)) {
					for (const header of headersCollection.header as Array<{ name: string; value: string }>) {
						if (header.name && header.value && header.name !== 'X-Webhook-Secret') {
							headers[header.name] = header.value;
						}
					}
				}

				// Register webhook using shared helper
				const webhook = await registerWebhook(this, clinicId, event, webhookUrl, {
					headers,
					isThirdParty: true, // Mark as third-party integration (n8n)
				});

				// Store webhook ID and secret for validation later
				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = webhook.id;
				webhookData.webhookSecret = webhookSecret;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId as string;

				if (!webhookId) {
					return false;
				}

				// Delete webhook using shared helper
				const deleted = await deleteWebhook(this, webhookId);

				if (deleted) {
					delete webhookData.webhookId;
				}

				return deleted;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const workflowData = this.getWorkflowStaticData('node');
		const expectedSecret = workflowData.webhookSecret as string | undefined;

		// Webhook secret is required - if missing, something went wrong during setup
		if (!expectedSecret) {
			return {
				webhookResponse: {
					status: 500,
					body: { error: 'Webhook not properly configured' },
				},
			};
		}

		// Verify webhook secret from incoming request
		const receivedSecret = this.getHeaderData()['x-webhook-secret'] as string | undefined;
		
		if (receivedSecret !== expectedSecret) {
			return {
				webhookResponse: {
					status: 401,
					body: { error: 'Invalid webhook secret' },
				},
			};
		}

		const bodyData = this.getBodyData();

		// Return the webhook payload to n8n
		return {
			workflowData: [this.helpers.returnJsonArray([bodyData])],
		};
	}
}
