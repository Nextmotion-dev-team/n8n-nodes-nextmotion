import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVisitGetMany = {
	operation: ['getAll'],
	resource: ['visit'],
};

export const visitFiltersDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: showOnlyForVisitGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Patient ID',
				name: 'patient',
				type: 'string',
				default: '',
				description: 'Filter visits related to this patient ID',
				routing: {
					request: {
						qs: {
							patient: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Visit Date',
				name: 'visit_date',
				type: 'dateTime',
				default: '',
				description: 'Filter visits matching this date',
				routing: {
					request: {
						qs: {
							visit_date: '={{$value.split("T")[0]}}',
						},
					},
				},
			},
		],
	},
];
