import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createPostOperation,
} from '../../shared/descriptions';
import { paymentMediumUpdateDescription } from './update';

const showOnlyForPaymentMedium = {
	resource: ['paymentMedium'],
};

export const paymentMediumDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForPaymentMedium },
		options: [
			createGetManyOperation('paymentMedium', 'payment mediums', '=/open_api/v4/clinics/{{$parameter.clinicId}}/payment_mediums'),
			createGetOperation('paymentMedium', 'payment medium', '=/open_api/v4/payment_mediums/{{$parameter.paymentMediumId}}'),
			createPostOperation(
				'Create',
				'create',
				'Create a payment medium',
				'Create a new custom payment medium',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/payment_mediums',
			),
			createUpdateOperation('payment medium', '=/open_api/v4/payment_mediums/{{$parameter.paymentMediumId}}'),
			createDeleteOperation('payment medium', '=/open_api/v4/payment_mediums/{{$parameter.paymentMediumId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForPaymentMedium,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Payment Medium',
		name: 'paymentMediumId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentMedium'],
				operation: ['get', 'update', 'delete'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the payment medium',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['paymentMedium'], operation: ['create'] } },
		description: 'Custom payment medium label',
		routing: { send: { type: 'body', property: 'name' } },
	},
	...createPaginationParameters('paymentMedium'),
	...paymentMediumUpdateDescription,
];
