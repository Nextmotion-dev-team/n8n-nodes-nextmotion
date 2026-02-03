import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { calendarAppointmentFiltersDescription } from './filters';
import { calendarAppointmentRescheduleDescription } from './reschedule';
import { calendarAppointmentUpdateDescription } from './update';

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
		required: false,
		displayOptions: {
			show: {
				...showOnlyForCalendarAppointment,
				operation: ['getAll', 'get', 'update', 'delete', 'getTreatments', 'reschedule'],
			},
		},
		description: 'Required for Get Many and when using dropdown selection. Optional when using appointment ID directly.',
	},
	{
		displayName: 'Appointment',
		name: 'appointmentId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarAppointment'],
				operation: ['get', 'update', 'delete', 'getTreatments', 'reschedule'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getCalendarAppointments',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The calendar appointment to operate on',
	},
	...createPaginationParameters('calendarAppointment'),
	...calendarAppointmentFiltersDescription,
	...calendarAppointmentRescheduleDescription,
	...calendarAppointmentUpdateDescription,
];
