import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAppointmentRequest = {
	resource: ['appointmentRequest'],
	operation: ['create'],
};

export const appointmentRequestCreateDescription: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		placeholder: 'patient@example.com',
		routing: {
			send: {
				type: 'body',
				property: 'email',
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'first_name',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'last_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'last_name',
			},
		},
	},
	{
		displayName: 'Birth Date',
		name: 'birth_date',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'birth_date',
				value: '={{$value.split("T")[0]}}',
			},
		},
	},
	{
		displayName: 'Phone Number',
		name: 'phone_number',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'phone_number',
			},
		},
	},
	{
		displayName: 'Visit Type Opening Hour',
		name: 'visit_type_opening_hour',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'Opening hour slot ID (retrieve from Visit Type > Get Opening Hours)',
		routing: {
			send: {
				type: 'body',
				property: 'visit_type_opening_hour',
			},
		},
	},
	{
		displayName: 'Time Slot',
		name: 'time_slot',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		default: '',
		description: 'Requested appointment time slot',
		routing: {
			send: {
				type: 'body',
				property: 'time_slot',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		options: [
			{
				displayName: 'Doctor',
				name: 'doctor',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getDoctors',
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
				description: 'Preferred doctor for the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'doctor',
					},
				},
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'options',
				default: 0,
				options: [
					{
						name: 'Female',
						value: 0,
					},
					{
						name: 'Male',
						value: 1,
					},
					{
						name: 'Other',
						value: 2,
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'gender',
					},
				},
			},
		],
	},
];
