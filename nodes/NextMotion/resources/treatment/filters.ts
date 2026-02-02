import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentGetMany = {
	operation: ['getAll'],
	resource: ['treatment'],
};

export const treatmentFiltersDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: showOnlyForTreatmentGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Consultation ID',
				name: 'consultation',
				type: 'string',
				default: '',
				description: 'Filter treatments related to this consultation ID',
				routing: {
					request: {
						qs: {
							consultation: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
