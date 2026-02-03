import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLead = {
	resource: ['lead'],
	operation: ['update'],
};

export const leadUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForLead,
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
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
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'first_name',
					},
				},
			},
			{
				displayName: 'Is Done',
				name: 'is_done',
				type: 'boolean',
				default: false,
				description: 'Whether the lead has been processed',
				routing: {
					send: {
						type: 'body',
						property: 'is_done',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'last_name',
					},
				},
			},
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
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'phone_number',
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
