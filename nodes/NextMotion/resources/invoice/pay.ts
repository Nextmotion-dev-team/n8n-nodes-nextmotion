import type { INodeProperties } from 'n8n-workflow';

const showOnlyForInvoicePay = {
	operation: ['pay'],
	resource: ['invoice'],
};

export const invoicePayDescription: INodeProperties[] = [
	{
		displayName: 'Payment Details',
		name: 'paymentDetails',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForInvoicePay,
		},
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'Payment amount',
				routing: {
					send: {
						type: 'body',
						property: 'amount',
					},
				},
			},
			{
				displayName: 'Payment Method',
				name: 'payment_method',
				type: 'string',
				default: '',
				description: 'Method of payment',
				routing: {
					send: {
						type: 'body',
						property: 'payment_method',
					},
				},
			},
			{
				displayName: 'Payment Date',
				name: 'payment_date',
				type: 'dateTime',
				default: '',
				description: 'Date of payment',
				routing: {
					send: {
						type: 'body',
						property: 'payment_date',
					},
				},
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				description: 'Payment reference number',
				routing: {
					send: {
						type: 'body',
						property: 'reference',
					},
				},
			},
		],
	},
];
