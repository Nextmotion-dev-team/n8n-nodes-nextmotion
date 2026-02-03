import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCalendarAppointment = {
	resource: ['calendarAppointment'],
	operation: ['update'],
};

export const calendarAppointmentUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForCalendarAppointment,
		},
		options: [
			{
				displayName: 'Calendar Event',
				name: 'calendar_event',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				description: 'Calendar event details such as times, doctors, rooms, etc',
				options: [
					{
						displayName: 'Appointment Room Names or IDs',
						name: 'appointment_rooms',
						type: 'multiOptions',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getAppointmentRooms',
						},
						description: 'Rooms for the appointment (required if doctors not provided). Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Color',
						name: 'color',
						type: 'color',
						default: '',
						description: 'Color for calendar display',
					},
					{
						displayName: 'Doctor Names or IDs',
						name: 'doctors',
						type: 'multiOptions',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getDoctors',
						},
						description: 'Doctors for the appointment (required if rooms not provided). Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'End Time',
						name: 'end_time',
						type: 'dateTime',
						default: '',
						description: 'End time of the appointment (must be after start time)',
					},
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
						typeOptions: {
							rows: 3,
						},
						description: 'Additional notes or comments about the appointment',
					},
					{
						displayName: 'Start Time',
						name: 'start_time',
						type: 'dateTime',
						default: '',
						description: 'Start time of the appointment',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: "Title or label for the event (usually patient's or doctor's full name)",
					},
					{
						displayName: 'Treatment Session Status',
						name: 'treatment_session_status',
						type: 'options',
						default: 'none',
						options: [
							{
								name: 'Control',
								value: 'control',
							},
							{
								name: 'New',
								value: 'new',
							},
							{
								name: 'None',
								value: 'none',
							},
							{
								name: 'Package',
								value: 'package',
							},
							{
								name: 'Paid',
								value: 'paid',
							},
							{
								name: 'Planned',
								value: 'planned',
							},
						],
						description: 'Status of the treatment session (ignored if no treatment sessions)',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'calendar_event',
					},
				},
			},
			{
				displayName: 'Device',
				name: 'device',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getAppointmentDevices',
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
				description: 'Device for this appointment',
				routing: {
					send: {
						type: 'body',
						property: 'device',
					},
				},
			},
			{
				displayName: 'Room',
				name: 'room',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getAppointmentRooms',
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
				description: 'Appointment room (deprecated - use calendar_event.appointment_rooms)',
				routing: {
					send: {
						type: 'body',
						property: 'room',
					},
				},
			},
			{
				displayName: 'Send Appointment Modified Email',
				name: 'send_appointment_modified_email',
				type: 'boolean',
				default: true,
				description: 'Whether to send an appointment modified email notification to the patient',
				routing: {
					send: {
						type: 'body',
						property: 'send_appointment_modified_email',
					},
				},
			},
			{
				displayName: 'Send Appointment Modified SMS',
				name: 'send_appointment_modified_sms',
				type: 'boolean',
				default: true,
				description: 'Whether to send an appointment modified SMS notification to the patient',
				routing: {
					send: {
						type: 'body',
						property: 'send_appointment_modified_sms',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'none',
				options: [
					{
						name: 'Absent',
						value: 'absent',
					},
					{
						name: 'Canceled Last Minute',
						value: 'canceled_last_minute',
					},
					{
						name: 'None',
						value: 'none',
					},
					{
						name: 'Seen by Provider',
						value: 'seen_by_provider',
					},
					{
						name: 'Waiting Room',
						value: 'waiting_room',
					},
					{
						name: 'With Provider',
						value: 'with_provider',
					},
				],
				description: 'Current status of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Statuses',
				name: 'statuses',
				type: 'multiOptions',
				default: [],
				options: [
					{
						name: 'Absent',
						value: 'absent',
					},
					{
						name: 'Canceled Last Minute',
						value: 'canceled_last_minute',
					},
					{
						name: 'Confirmed',
						value: 'confirmed',
					},
					{
						name: 'Internet Booking',
						value: 'internet_booking',
					},
					{
						name: 'Late',
						value: 'late',
					},
					{
						name: 'New Patient',
						value: 'new_patient',
					},
					{
						name: 'None',
						value: 'none',
					},
					{
						name: 'Package',
						value: 'package',
					},
					{
						name: 'Paid',
						value: 'paid',
					},
					{
						name: 'Seen by Provider',
						value: 'seen_by_provider',
					},
					{
						name: 'Treatment Room',
						value: 'treatment_room',
					},
					{
						name: 'Waiting for Confirmation',
						value: 'waiting_for_confirmation',
					},
					{
						name: 'Waiting Room',
						value: 'waiting_room',
					},
					{
						name: 'With Provider',
						value: 'with_provider',
					},
				],
				description: 'Assigned appointment tags',
				routing: {
					send: {
						type: 'body',
						property: 'statuses',
					},
				},
			},
			{
				displayName: 'Sub Visit Type',
				name: 'sub_visit_type',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getSubVisitTypes',
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
				description: 'Sub-visit type related to the picked visit type (filtered by Visit Type selection)',
				routing: {
					send: {
						type: 'body',
						property: 'sub_visit_type',
					},
				},
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Appointment visit type subject',
				routing: {
					send: {
						type: 'body',
						property: 'subject',
					},
				},
			},
			{
				displayName: 'Visit Type',
				name: 'visit_type',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getVisitTypes',
							searchable: false,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'visit_type',
					},
				},
			},
		],
	},
];
