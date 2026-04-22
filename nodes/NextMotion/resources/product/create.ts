import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductCreate = {
	operation: ['create'],
	resource: ['product'],
};

export const productCreateDescription: INodeProperties[] = [
	{
		displayName: 'Global Product ID',
		name: 'global_product',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForProductCreate },
		description: 'Global catalog product ID to add to this clinic\'s stock',
		routing: { send: { type: 'body', property: 'global_product' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForProductCreate },
		options: [
			{
				displayName: 'Expiration Date',
				name: 'expiration_date',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'expiration_date' } },
			},
			{
				displayName: 'Lot Number',
				name: 'lot_number',
				type: 'string',
				default: '',
				description: 'Lot or batch number',
				routing: { send: { type: 'body', property: 'lot_number' } },
			},
			{
				displayName: 'Stock Level',
				name: 'stock_level',
				type: 'string',
				default: '',
				description: 'Initial digital stock level',
				routing: { send: { type: 'body', property: 'stock_level' } },
			},
			{
				displayName: 'Unit Price',
				name: 'unit_price',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'unit_price' } },
			},
			{
				displayName: 'Warning Level',
				name: 'warning_level',
				type: 'number',
				default: 0,
				description: 'Low-stock threshold',
				routing: { send: { type: 'body', property: 'warning_level' } },
			},
		],
	},
];
