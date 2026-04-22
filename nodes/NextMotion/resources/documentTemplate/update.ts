import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDocumentTemplateUpdate = {
	operation: ['update'],
	resource: ['documentTemplate'],
};

export const documentTemplateUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForDocumentTemplateUpdate },
		description: 'Name of the document template',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Template',
		name: 'template',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForDocumentTemplateUpdate },
		description: 'HTML or template content of the document',
		typeOptions: {
			rows: 6,
		},
		routing: { send: { type: 'body', property: 'template' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForDocumentTemplateUpdate },
		options: [
			{
				displayName: 'Autoshow',
				name: 'autoshow',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'autoshow' } },
			},
			{
				displayName: 'Display in Consultations',
				name: 'display_in_consultations',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'display_in_consultations' } },
			},
		],
	},
];
