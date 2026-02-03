import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCall = {
	resource: ['call'],
	operation: ['create'],
};

export const callCreateDescription: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForCall,
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
				description: 'Additional notes or comments regarding the call',
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					},
				},
			},
			{
				displayName: 'Patient',
				name: 'patient',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getPatients',
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
			description: 'The patient associated with this call',
				routing: {
					send: {
						type: 'body',
						property: 'patient',
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'Phone number the call was made to or received from',
				routing: {
					send: {
						type: 'body',
						property: 'phone_number',
					},
				},
			},
			{
				displayName: 'Recording URL',
				name: 'recording_url',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/recording.mp3',
				description: 'URL to the call recording file if stored externally',
				routing: {
					send: {
						type: 'body',
						property: 'recording_url',
					},
				},
			},
			{
				displayName: 'Time',
				name: 'time',
				type: 'dateTime',
				default: '',
				description: 'Date and time of the call',
				routing: {
					send: {
						type: 'body',
						property: 'time',
					},
				},
			},
			{
				displayName: 'Transcript',
				name: 'transcript',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Text transcript of the call, if available',
				routing: {
					send: {
						type: 'body',
						property: 'transcript',
					},
				},
			},
		],
	},
];
