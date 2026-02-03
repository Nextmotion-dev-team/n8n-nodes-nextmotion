import type { INodeProperties } from 'n8n-workflow';

const showOnlyForQuote = {
	resource: ['quote'],
	operation: ['update'],
};

export const quoteUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForQuote,
		},
		options: [
			{
				displayName: 'Rebate',
				name: 'rebate',
				type: 'string',
				default: '0.00',
				placeholder: '10.50',
				description: 'Absolute rebate amount to subtract from the quote total (decimal string)',
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
				description: 'Percentage rebate amount (0.00 to 100.00) to apply on the quote total',
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
				description: 'Short title for the quote displayed in events timeline',
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
