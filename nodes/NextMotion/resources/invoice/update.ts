import type { INodeProperties } from 'n8n-workflow';

const showOnlyForInvoice = {
	resource: ['invoice'],
	operation: ['update'],
};

export const invoiceUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForInvoice,
		},
		options: [
			{
				displayName: 'Invoice Issue Date',
				name: 'issued_time',
				type: 'dateTime',
				default: '',
				description:
					"Invoice issue date as a full UTC datetime, drives the invoice number's year (left unchanged if empty)",
				routing: {
					send: {
						type: 'body',
						property: 'issued_time',
					},
				},
			},
			{
				displayName: 'Invoiced Time',
				name: 'invoiced_time',
				type: 'dateTime',
				default: '',
				description: 'Invoice sale date as a full UTC datetime (left unchanged if empty)',
				routing: {
					send: {
						type: 'body',
						property: 'invoiced_time',
					},
				},
			},
			{
				displayName: 'Rebate',
				name: 'rebate',
				type: 'string',
				default: '0.00',
				placeholder: '10.50',
				description: 'Absolute rebate amount to subtract from the invoice total (decimal string)',
				routing: {
					send: {
						type: 'body',
						property: 'rebate',
					},
				},
			},
			{
				displayName: 'Rebate Details',
				name: 'rebate_details',
				type: 'string',
				default: '',
				description: 'Additional comments or notes regarding the applied rebate',
				routing: {
					send: {
						type: 'body',
						property: 'rebate_details',
					},
				},
			},
			{
				displayName: 'Rebate Percent',
				name: 'rebate_percent',
				type: 'string',
				default: '',
				placeholder: '10.00',
				description: 'Percentage rebate amount (0.00 to 100.00) to apply on the invoice total',
				routing: {
					send: {
						type: 'body',
						property: 'rebate_percent',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Short title for the invoice displayed in events timeline',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
		],
	},
];
