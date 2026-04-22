import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccountingDistributionCreate = {
	operation: ['create'],
	resource: ['accountingDistribution'],
};

export const accountingDistributionCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForAccountingDistributionCreate },
		description: 'Display name of the accounting distribution',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Model (JSON)',
		name: 'model',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: { show: showOnlyForAccountingDistributionCreate },
		description: 'Exactly two distribution lines (clinic and provider) splitting the revenue. Array of objects with "type" and "percent" fields.',
		routing: { send: { type: 'body', property: 'model' } },
	},
];
