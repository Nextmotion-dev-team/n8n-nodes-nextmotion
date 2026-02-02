import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { paymentFiltersDescription } from './filters';

const showOnlyForPayment = {
	resource: ['payment'],
};

export const paymentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPayment,
		},
		options: [
			createGetManyOperation(
				'payment',
				'payments',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/payments',
			),
			createGetOperation(
				'payment',
				'payment',
				'=/open_api/v4/payments/{{$parameter.paymentId}}',
			),
			createUpdateOperation(
				'payment',
				'=/open_api/v4/payments/{{$parameter.paymentId}}',
			),
			createDeleteOperation(
				'payment',
				'=/open_api/v4/payments/{{$parameter.paymentId}}',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForPayment,
				operation: ['getAll'],
			},
		},
	},
	...createPaginationParameters('payment'),
	createIdField('Payment ID', 'paymentId', 'payment', ['get', 'update', 'delete']),
	...paymentFiltersDescription,
];
