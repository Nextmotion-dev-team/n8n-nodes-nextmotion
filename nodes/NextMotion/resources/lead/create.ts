import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLead = {
	resource: ['lead'],
	operation: ['create'],
};

export const leadCreateDescription: INodeProperties[] = [
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForLead,
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
			show: showOnlyForLead,
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
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForLead,
		},
		default: '',
		placeholder: 'lead@example.com',
		routing: {
			send: {
				type: 'body',
				property: 'email',
			},
		},
	},
	{
		displayName: 'Phone Number',
		name: 'phone_number',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForLead,
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForLead,
		},
		options: [
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					},
				},
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				default: 'unknown',
				options: [
					{
						name: 'Unknown',
						value: 'unknown',
					},
					{
						name: 'Beauty Page',
						value: 'beauty_page',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'source',
					},
				},
			},
		],
	},
];
