import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { WEBHOOK_EVENT_OPTIONS } from '../../shared/webhookHelpers';

const showOnlyForWebhook = {
	resource: ['webhook'],
};

export const webhookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWebhook,
		},
		options: [
			createGetManyOperation(
				'webhook',
				'webhooks',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/webhooks',
			),
			createGetOperation(
				'webhook',
				'webhook',
				'=/open_api/v4/webhooks/{{$parameter.webhookId}}',
			),
			createCreateOperation('webhook', '/open_api/v4/clinics/{{$parameter.clinicId}}/webhooks'),
			createUpdateOperation('webhook', '/open_api/v4/webhooks/{{$parameter.webhookId}}'),
			createDeleteOperation('webhook', '/open_api/v4/webhooks/{{$parameter.webhookId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForWebhook,
				operation: ['getAll', 'create'],
			},
		},
	},
	createIdField('Webhook ID', 'webhookId', 'webhook', ['get', 'update', 'delete']),
	...createPaginationParameters('webhook'),
	// Create operation fields
	{
		displayName: 'Event Type',
		name: 'action_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForWebhook,
				operation: ['create'],
			},
		},
		default: 'patient_create',
		options: WEBHOOK_EVENT_OPTIONS,
		routing: {
			send: {
				type: 'body',
				property: 'action_type',
			},
		},
		description: 'The event type that will trigger this webhook',
	},
	{
		displayName: 'Webhook URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForWebhook,
				operation: ['create', 'update'],
			},
		},
		default: '',
		placeholder: 'https://example.com/webhook',
		description: 'The URL that will receive webhook POST requests',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForWebhook,
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Custom Headers',
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
								description: 'Header name',
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
				description: 'Custom HTTP headers to include in webhook requests',
				routing: {
					send: {
						type: 'body',
						property: 'headers',
						value: '={{$value.header?.reduce((acc, h) => ({...acc, [h.name]: h.value}), {}) || {}}}',
					},
				},
			},
		],
	},
];
