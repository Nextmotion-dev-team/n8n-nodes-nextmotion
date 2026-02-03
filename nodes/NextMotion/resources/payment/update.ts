import type { INodeProperties } from 'n8n-workflow';
import { createPaymentField } from '../../shared/paymentFields';

const showOnlyForPayment = {
	resource: ['payment'],
	operation: ['update'],
};

const paymentsField = createPaymentField('Payment methods and amounts to update');

export const paymentUpdateDescription: INodeProperties[] = [
	{
		...paymentsField,
		displayName: 'Update Fields',
		name: 'updateFields',
		displayOptions: {
			show: showOnlyForPayment,
		},
		// For update, we need to extract the payment methods directly to root level instead of nested
		routing: {
			send: {
				type: 'body',
				value: '={{Object.assign({}, ...Object.entries($value.payment || {}).map(([type, items]) => items.map(item => ({ [type]: item.amount, ...item.additionalFields })).reduce((acc, obj) => Object.assign(acc, obj), {})))}}',
			},
		},
	},
];
