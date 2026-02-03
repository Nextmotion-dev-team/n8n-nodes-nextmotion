import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { invoiceCreateDescription } from './create';
import { invoicePayDescription } from './pay';
import { invoiceUpdateDescription } from './update';

const showOnlyForInvoice = {
	resource: ['invoice'],
};

export const invoiceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForInvoice,
		},
		options: [
			createGetManyOperation(
				'invoice',
				'invoices',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/invoices',
			),
			createGetOperation(
				'invoice',
				'invoice',
				'=/open_api/v4/invoices/{{$parameter.invoiceId}}',
			),
			createCreateOperation(
				'invoice',
				'=/open_api/v4/consultations/{{$parameter.consultationId}}/invoices',
			),
			createUpdateOperation(
				'invoice',
				'=/open_api/v4/invoices/{{$parameter.invoiceId}}',
			),
			createDeleteOperation(
				'invoice',
				'=/open_api/v4/invoices/{{$parameter.invoiceId}}',
			),
			createPostOperation(
				'Pay',
				'pay',
				'Pay an invoice',
				'Mark an invoice as paid',
				'=/open_api/v4/invoices/{{$parameter.invoiceId}}/pay',
			),
			createPostOperation(
				'Validate',
				'validate',
				'Validate an invoice',
				'Validate and finalize an invoice',
				'=/open_api/v4/invoices/{{$parameter.invoiceId}}/validate',
			),
		],
		default: 'create',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForInvoice,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'pay', 'validate'],
			},
		},
		description: 'Required for Get Many. Optional for other operations when using invoice ID directly.',
	},
	{
		displayName: 'Invoice',
		name: 'invoiceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['get', 'update', 'delete', 'pay', 'validate'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getInvoices',
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
		description: 'The invoice to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('invoice'),
	...invoiceCreateDescription,
	...invoicePayDescription,
	...invoiceUpdateDescription,
];
