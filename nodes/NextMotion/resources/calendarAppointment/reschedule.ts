import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCalendarAppointmentReschedule = {
	operation: ['reschedule'],
	resource: ['calendarAppointment'],
};

export const calendarAppointmentRescheduleDescription: INodeProperties[] = [
	{
		displayName: 'Time Slot',
		name: 'time_slot',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCalendarAppointmentReschedule,
		},
		description: 'The new time slot for the appointment',
		routing: {
			send: {
				type: 'body',
				property: 'time_slot',
			},
		},
	},
	{
		displayName: 'Visit Type Opening Hour',
		name: 'visit_type_opening_hour',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCalendarAppointmentReschedule,
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'Visit type opening hour ID for the rescheduled appointment',
		routing: {
			send: {
				type: 'body',
				property: 'visit_type_opening_hour',
			},
		},
	},
];
