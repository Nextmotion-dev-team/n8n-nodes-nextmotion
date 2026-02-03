import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrescriptionUpdate = {
	operation: ['update'],
	resource: ['prescription'],
};

export const prescriptionUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForPrescriptionUpdate,
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 6,
				},
				default: '',
				description: 'Full prescription instructions in HTML format (e.g., <p>Take 1 tablet twice daily</p>)',
				routing: {
					send: {
						type: 'body',
						property: 'content',
					},
				},
			},
			{
				displayName: 'Document Template',
				name: 'document_template',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getPrescriptionDocumentTemplates',
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
				description: 'Document template to render the prescription PDF (select clinic first for dropdown)',
				routing: {
					send: {
						type: 'body',
						property: 'document_template',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Short title or heading for the prescription',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
		],
	},
];
