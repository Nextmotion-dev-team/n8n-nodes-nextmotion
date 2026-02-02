import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { invoicePayDescription } from './pay';

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
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForInvoice,
				operation: ['getAll'],
			},
		},
	},
	...createPaginationParameters('invoice'),
	createIdField('Invoice ID', 'invoiceId', 'invoice', ['get', 'update', 'delete', 'pay', 'validate']),
	...invoicePayDescription,
];
