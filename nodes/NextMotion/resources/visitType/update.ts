import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVisitTypeUpdate = {
	operation: ['update'],
	resource: ['visitType'],
};

export const visitTypeUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForVisitTypeUpdate },
		description: 'Display name of the visit type',
		routing: { send: { type: 'body', property: 'subject' } },
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: 'ffffffff',
		required: true,
		placeholder: 'ffffffff',
		displayOptions: { show: showOnlyForVisitTypeUpdate },
		description: 'RGBA HEX color code',
		routing: { send: { type: 'body', property: 'color' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForVisitTypeUpdate },
		options: [
			{
				displayName: 'Category ID',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Visit type category ID',
				routing: { send: { type: 'body', property: 'category' } },
			},
			{
				displayName: 'Display in Agenda',
				name: 'display_in_agenda',
				type: 'boolean',
				default: true,
				routing: { send: { type: 'body', property: 'display_in_agenda' } },
			},
			{
				displayName: 'Display in Dashboard',
				name: 'display_in_dashboard',
				type: 'boolean',
				default: true,
				routing: { send: { type: 'body', property: 'display_in_dashboard' } },
			},
			{
				displayName: 'Duration (Minutes)',
				name: 'duration_minutes',
				type: 'number',
				default: 30,
				routing: { send: { type: 'body', property: 'duration_minutes' } },
			},
			{
				displayName: 'Next Visit Reminder (Days)',
				name: 'next_visit_reminder_days',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'next_visit_reminder_days' } },
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'price' } },
			},
		],
	},
];
