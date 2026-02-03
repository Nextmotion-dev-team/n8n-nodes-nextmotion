import type { INodeProperties } from 'n8n-workflow';
import { createPaymentField } from '../../shared/paymentFields';

const showOnlyForInvoicePay = {
	operation: ['pay'],
	resource: ['invoice'],
};

const paymentsField = createPaymentField('Payment methods and amounts for the invoice');

export const invoicePayDescription: INodeProperties[] = [
	{
		...paymentsField,
		required: true,
		displayOptions: {
			show: showOnlyForInvoicePay,
		},
	},
];
