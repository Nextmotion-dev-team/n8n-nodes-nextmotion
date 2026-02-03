import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVisit = {
	resource: ['visit'],
	operation: ['create'],
};

export const visitCreateDescription: INodeProperties[] = [
	{
		displayName: 'Patient',
		name: 'patient',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForVisit,
		},
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
		description: 'The patient associated with this visit',
		routing: {
			send: {
				type: 'body',
				property: 'patient',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForVisit,
		},
		default: '',
		description: 'Visit subject',
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'Visit Start Time',
		name: 'visit_time',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: showOnlyForVisit,
		},
		default: '',
		description: 'Start time of the visit (ISO 8601 format)',
		routing: {
			send: {
				type: 'body',
				property: 'visit_time',
			},
		},
	},
	{
		displayName: 'Visit End Time',
		name: 'visit_end_time',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: showOnlyForVisit,
		},
		default: '',
		description: 'End time of the visit (ISO 8601 format)',
		routing: {
			send: {
				type: 'body',
				property: 'visit_end_time',
			},
		},
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		required: true,
		displayOptions: {
			show: showOnlyForVisit,
		},
		default: '#ffffffff',
		description: 'RGBA HEX color code',
		routing: {
			send: {
				type: 'body',
				property: 'color',
				value: '={{$value.replace("#", "")}}',
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
			show: showOnlyForVisit,
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Notes made during the visit, in HTML format',
				routing: {
					send: {
						type: 'body',
						property: 'note',
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
