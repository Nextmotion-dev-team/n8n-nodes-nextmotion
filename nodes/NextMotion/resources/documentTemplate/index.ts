import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForDocumentTemplate = {
	resource: ['documentTemplate'],
};

export const documentTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDocumentTemplate,
		},
		options: [
			createGetManyOperation(
				'documentTemplate',
				'document templates',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/document_templates',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForDocumentTemplate,
		},
	},
	...createPaginationParameters('documentTemplate'),
];
