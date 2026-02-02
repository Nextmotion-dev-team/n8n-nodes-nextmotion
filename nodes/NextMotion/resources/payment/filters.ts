import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPaymentGetMany = {
	operation: ['getAll'],
	resource: ['payment'],
};

export const paymentFiltersDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: showOnlyForPaymentGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Invoice ID',
				name: 'invoice',
				type: 'string',
				default: '',
				description: 'Filter payments related to this invoice ID',
				routing: {
					request: {
						qs: {
							invoice: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
