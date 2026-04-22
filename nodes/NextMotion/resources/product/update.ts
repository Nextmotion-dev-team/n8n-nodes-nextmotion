import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductUpdate = {
	operation: ['update'],
	resource: ['product'],
};

export const productUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForProductUpdate },
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
				routing: { send: { type: 'body', property: 'lot_number' } },
			},
			{
				displayName: 'Physical Stock Level',
				name: 'physical_stock_level',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'physical_stock_level' } },
			},
			{
				displayName: 'Stock Level',
				name: 'stock_level',
				type: 'string',
				default: '',
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
				routing: { send: { type: 'body', property: 'warning_level' } },
			},
		],
	},
];
