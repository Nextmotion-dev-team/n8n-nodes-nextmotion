import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCalendarAppointmentReschedule = {
	operation: ['reschedule'],
	resource: ['calendarAppointment'],
};

export const calendarAppointmentRescheduleDescription: INodeProperties[] = [
	{
		displayName: 'Start Time',
		name: 'start_time',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCalendarAppointmentReschedule,
		},
		description: 'The new start time for the appointment',
		routing: {
			send: {
				type: 'body',
				property: 'start_time',
			},
		},
	},
	{
		displayName: 'End Time',
		name: 'end_time',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCalendarAppointmentReschedule,
		},
		description: 'The new end time for the appointment',
		routing: {
			send: {
				type: 'body',
				property: 'end_time',
			},
		},
	},
];
