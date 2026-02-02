import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCalendarAppointmentGetMany = {
	operation: ['getAll'],
	resource: ['calendarAppointment'],
};

export const calendarAppointmentFiltersDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: showOnlyForCalendarAppointmentGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Filter calendar appointments matching this date',
				routing: {
					request: {
						qs: {
							date: '={{$value.split("T")[0]}}',
						},
					},
				},
			},
		{
			displayName: 'Patient ID',
			name: 'patient',
			type: 'string',
			default: '',
			description: 'Filter calendar appointments related to this patient ID',
			routing: {
				request: {
					qs: {
						patient: '={{$value}}',
					},
				},
			},
		},
		],
	},
];
