import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVisit = {
	resource: ['visit'],
	operation: ['update'],
};

export const visitUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
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
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
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
				displayName: 'Visit End Time',
				name: 'visit_end_time',
				type: 'dateTime',
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
				displayName: 'Visit Start Time',
				name: 'visit_time',
				type: 'dateTime',
				default: '',
				description: 'Start time of the visit (ISO 8601 format)',
				routing: {
					send: {
						type: 'body',
						property: 'visit_time',
					},
				},
			},
		],
	},
];
