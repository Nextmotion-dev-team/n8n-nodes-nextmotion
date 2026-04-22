import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentPackageUpdate = {
	operation: ['update'],
	resource: ['treatmentPackage'],
};

export const treatmentPackageUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'treatmentPackageName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForTreatmentPackageUpdate },
		description: 'Display name of the treatment package',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Items (JSON)',
		name: 'packageItems',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: { show: showOnlyForTreatmentPackageUpdate },
		description: 'Bundled treatment price lines (array of objects with treatment_pricing ID)',
		routing: { send: { type: 'body', property: 'items' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForTreatmentPackageUpdate },
		options: [
			{
				displayName: 'Price',
				name: 'price',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'price' } },
			},
			{
				displayName: 'VAT Rate',
				name: 'vat_rate',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'vat_rate' } },
			},
		],
	},
];
