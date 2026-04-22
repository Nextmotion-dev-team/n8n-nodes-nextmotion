import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentPackageCreate = {
	operation: ['create'],
	resource: ['treatmentPackage'],
};

export const treatmentPackageCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForTreatmentPackageCreate },
		description: 'Display name of the treatment package',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Items (JSON)',
		name: 'items',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: { show: showOnlyForTreatmentPackageCreate },
		description: 'Bundled treatment price lines that make up this package (array of objects with treatment_pricing ID)',
		routing: { send: { type: 'body', property: 'items' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForTreatmentPackageCreate },
		options: [
			{
				displayName: 'Price',
				name: 'price',
				type: 'string',
				default: '',
				description: 'Total package price including VAT',
				routing: { send: { type: 'body', property: 'price' } },
			},
			{
				displayName: 'VAT Rate',
				name: 'vat_rate',
				type: 'string',
				default: '',
				placeholder: '10.5',
				description: 'VAT rate as percent',
				routing: { send: { type: 'body', property: 'vat_rate' } },
			},
		],
	},
];
