import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPatientCreate = {
	operation: ['create'],
	resource: ['patient'],
};

export const patientCreateDescription: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForPatientCreate,
		},
		description: "Patient's email address",
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
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForPatientCreate,
		},
		description: "Patient's first name",
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
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForPatientCreate,
		},
		description: "Patient's last name",
		routing: {
			send: {
				type: 'body',
				property: 'last_name',
			},
		},
	},
	{
		displayName: 'Gender',
		name: 'gender',
		type: 'options',
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
		default: 0,
		required: true,
		displayOptions: {
			show: showOnlyForPatientCreate,
		},
		description: "Patient's gender",
		routing: {
			send: {
				type: 'body',
				property: 'gender',
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
			show: showOnlyForPatientCreate,
		},
		options: [
			{
				displayName: 'Birth Date',
				name: 'birth_date',
				type: 'dateTime',
				default: '',
				description: "Patient's birth date",
				routing: {
					send: {
						type: 'body',
						property: 'birth_date',
						value: '={{$value.split("T")[0]}}',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: "City for the patient's address",
				routing: {
					send: {
						type: 'body',
						property: 'city',
					},
				},
			},
			{
				displayName: 'Doctor Comments',
				name: 'doctor_comments',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Internal comments or notes from the doctor regarding the patient (HTML format)',
				routing: {
					send: {
						type: 'body',
						property: 'doctor_comments',
					},
				},
			},
			{
				displayName: 'Is Archived',
				name: 'is_archived',
				type: 'boolean',
				default: false,
				description: 'Whether the patient is archived',
				routing: {
					send: {
						type: 'body',
						property: 'is_archived',
					},
				},
			},
			{
				displayName: 'Patient Number',
				name: 'patient_number',
				type: 'string',
				default: '',
				description: 'Custom internal identifier of the patient within clinic',
				routing: {
					send: {
						type: 'body',
						property: 'patient_number',
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: "Patient's phone number",
				routing: {
					send: {
						type: 'body',
						property: 'phone_number',
					},
				},
			},
			{
				displayName: 'Postal Address',
				name: 'postal_address',
				type: 'string',
				default: '',
				description: "Patient's street address",
				routing: {
					send: {
						type: 'body',
						property: 'postal_address',
					},
				},
			},
			{
				displayName: 'ZIP Code',
				name: 'zip_code',
				type: 'string',
				default: '',
				description: "Postal/ZIP code for the patient's address",
				routing: {
					send: {
						type: 'body',
						property: 'zip_code',
					},
				},
			},
		],
	},
];
