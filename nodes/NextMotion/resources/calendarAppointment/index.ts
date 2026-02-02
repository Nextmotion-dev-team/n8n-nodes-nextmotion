import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { calendarAppointmentFiltersDescription } from './filters';
import { calendarAppointmentRescheduleDescription } from './reschedule';

const showOnlyForCalendarAppointment = {
	resource: ['calendarAppointment'],
};

export const calendarAppointmentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCalendarAppointment,
		},
		options: [
			createGetManyOperation(
				'calendarAppointment',
				'calendar appointments',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/calendar_appointments',
			),
			createGetOperation(
				'calendarAppointment',
				'calendar appointment',
				'=/open_api/v4/calendar_appointments/{{$parameter.appointmentId}}',
			),
			createUpdateOperation(
				'calendarAppointment',
				'=/open_api/v4/calendar_appointments/{{$parameter.appointmentId}}',
			),
			createDeleteOperation(
				'calendarAppointment',
				'=/open_api/v4/calendar_appointments/{{$parameter.appointmentId}}',
			),
			{
				name: 'Get Treatments',
				value: 'getTreatments',
				action: 'Get treatments for appointment',
				description: 'Get treatments associated with a calendar appointment',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/calendar_appointments/{{$parameter.appointmentId}}/treatments',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
			createPostOperation(
				'Reschedule',
				'reschedule',
				'Reschedule a calendar appointment',
				'Reschedule an existing calendar appointment',
				'=/open_api/v4/calendar_appointments/{{$parameter.appointmentId}}/reschedule',
			),
		],
		default: 'getTreatments',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForCalendarAppointment,
				operation: ['getAll'],
			},
		},
	},
	createIdField('Appointment ID', 'appointmentId', 'calendarAppointment', ['get', 'update', 'delete', 'getTreatments', 'reschedule']),
	...createPaginationParameters('calendarAppointment'),
	...calendarAppointmentFiltersDescription,
	...calendarAppointmentRescheduleDescription,
];
