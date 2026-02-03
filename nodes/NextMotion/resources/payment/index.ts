import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { paymentFiltersDescription } from './filters';
import { paymentUpdateDescription } from './update';

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
		required: false,
		displayOptions: {
			show: {
				...showOnlyForPayment,
				operation: ['getAll', 'get', 'update', 'delete'],
			},
		},
		description: 'Required for Get Many. Optional for Get/Update/Delete when using payment ID directly.',
	},
	{
		displayName: 'Payment',
		name: 'paymentId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getPayments',
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
		description: 'The payment to operate on',
	},
	...createPaginationParameters('payment'),
	...paymentFiltersDescription,
	...paymentUpdateDescription,
];
