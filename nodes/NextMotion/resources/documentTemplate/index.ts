import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createPostOperation,
} from '../../shared/descriptions';
import { documentTemplateCreateDescription } from './create';
import { documentTemplateUpdateDescription } from './update';

const showOnlyForDocumentTemplate = {
	resource: ['documentTemplate'],
};

export const documentTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDocumentTemplate },
		options: [
			createGetManyOperation(
				'documentTemplate',
				'document templates',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/document_templates',
			),
			createGetOperation(
				'documentTemplate',
				'document template',
				'=/open_api/v4/document_templates/{{$parameter.documentTemplateId}}',
			),
			createCreateOperation('document template', '=/open_api/v4/clinics/{{$parameter.clinicId}}/document_templates'),
			createUpdateOperation('document template', '=/open_api/v4/document_templates/{{$parameter.documentTemplateId}}'),
			createDeleteOperation('document template', '=/open_api/v4/document_templates/{{$parameter.documentTemplateId}}'),
			createPostOperation(
				'Duplicate',
				'duplicate',
				'Duplicate a document template',
				'Create a copy of an existing document template',
				'=/open_api/v4/document_templates/{{$parameter.documentTemplateId}}/duplicate',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForDocumentTemplate,
				operation: ['getAll', 'get', 'create', 'update', 'delete', 'duplicate'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations when using template ID directly.',
	},
	{
		displayName: 'Document Template',
		name: 'documentTemplateId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['documentTemplate'],
				operation: ['get', 'update', 'delete', 'duplicate'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getInvoiceDocumentTemplates', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The document template to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('documentTemplate'),
	...documentTemplateCreateDescription,
	...documentTemplateUpdateDescription,
];
