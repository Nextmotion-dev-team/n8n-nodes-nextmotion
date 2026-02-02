import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPatientGetMany = {
	operation: ['getAll'],
	resource: ['patient'],
};

export const patientFiltersDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: showOnlyForPatientGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Birth Date',
				name: 'birth_date',
				type: 'dateTime',
				default: '',
				description: 'Filter patients matching this birth date',
				routing: {
					request: {
						qs: {
							birth_date: '={{$value.split("T")[0]}}',
						},
					},
				},
			},
			{
				displayName: 'Invoice Total Greater Than',
				name: 'invoice_total__gt',
				type: 'number',
				default: 0,
				description: 'Filter patients with invoice total greater than this amount',
				routing: {
					request: {
						qs: {
							invoice_total__gt: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Is Archived',
				name: 'is_archived',
				type: 'boolean',
				default: false,
				description: 'Whether to filter for archived patients',
				routing: {
					request: {
						qs: {
							is_archived: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'Filter patients matching this phone number',
				routing: {
					request: {
						qs: {
							phone_number: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search through patients by name, birth date, phone number or ID',
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
