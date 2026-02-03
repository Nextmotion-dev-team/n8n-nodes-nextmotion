import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
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
		required: false,
		displayOptions: {
			show: {
				...showOnlyForWebhook,
				operation: ['getAll', 'create', 'get', 'update', 'delete'],
			},
		},
		description: 'Required for Get Many and Create. Optional for Get/Update/Delete when using webhook ID directly.',
	},
	{
		displayName: 'Webhook',
		name: 'webhookId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getWebhooks',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The webhook to operate on (select clinic first for dropdown)',
	},
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
