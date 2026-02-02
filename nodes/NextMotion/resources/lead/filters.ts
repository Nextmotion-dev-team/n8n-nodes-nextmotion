import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLeadGetMany = {
	operation: ['getAll'],
	resource: ['lead'],
};

export const leadFiltersDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: showOnlyForLeadGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search through leads by name, email, phone number or notes',
				routing: {
					request: {
						qs: {
							search: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
