import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';

const showOnlyForCommunicationTemplate = {
	resource: ['communicationTemplate'],
};

export const communicationTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCommunicationTemplate },
		options: [
			createGetManyOperation(
				'communicationTemplate',
				'communication templates',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/communication_templates',
			),
			{
				name: 'Get',
				value: 'get',
				action: 'Get a communication template',
				description: 'Get the data of a single communication template',
				routing: {
					request: { method: 'GET', url: '=/open_api/v4/communication_templates/{{$parameter.communicationTemplateId}}' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a communication template',
				description: 'Update an existing communication template',
				routing: {
					request: { method: 'PUT', url: '=/open_api/v4/communication_templates/{{$parameter.communicationTemplateId}}' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
		],
		default: 'get',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForCommunicationTemplate,
				operation: ['getAll', 'get', 'update'],
			},
		},
		description: 'Required for Get Many. Optional for other operations.',
	},
	{
		displayName: 'Communication Template',
		name: 'communicationTemplateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communicationTemplate'],
				operation: ['get', 'update'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the communication template',
	},
	{
		displayName: 'Template (JSON)',
		name: 'template',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: { show: { ...showOnlyForCommunicationTemplate, operation: ['update'] } },
		description: 'Template content as JSON object',
		routing: { send: { type: 'body', property: 'template' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { ...showOnlyForCommunicationTemplate, operation: ['update'] } },
		options: [
			{
				displayName: 'Is Enabled',
				name: 'is_enabled',
				type: 'boolean',
				default: true,
				routing: { send: { type: 'body', property: 'is_enabled' } },
			},
		],
	},
	...createPaginationParameters('communicationTemplate'),
];
