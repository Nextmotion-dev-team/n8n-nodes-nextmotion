import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createDeleteOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';

const showOnlyForCalendarOpeningHour = {
	resource: ['calendarOpeningHour'],
};

export const calendarOpeningHourDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCalendarOpeningHour },
		options: [
			createGetManyOperation('calendarOpeningHour', 'calendar opening hours', '=/open_api/v4/clinics/{{$parameter.clinicId}}/calendar_opening_hours'),
			createGetOperation('calendarOpeningHour', 'calendar opening hour', '=/open_api/v4/calendar_opening_hours/{{$parameter.calendarOpeningHourId}}'),
			{
				name: 'Create',
				value: 'create',
				action: 'Create a calendar opening hour',
				description: 'Create a new calendar opening hour slot',
				routing: {
					request: { method: 'POST', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/calendar_opening_hours' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a calendar opening hour',
				description: 'Update an existing calendar opening hour slot',
				routing: {
					request: { method: 'PUT', url: '=/open_api/v4/calendar_opening_hours/{{$parameter.calendarOpeningHourId}}' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			createDeleteOperation('calendar opening hour', '=/open_api/v4/calendar_opening_hours/{{$parameter.calendarOpeningHourId}}'),
		],
		default: 'create',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForCalendarOpeningHour,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Calendar Opening Hour',
		name: 'calendarOpeningHourId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarOpeningHour'],
				operation: ['get', 'update', 'delete'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the calendar opening hour',
	},
	{
		displayName: 'Calendar Event (JSON)',
		name: 'calendar_event',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: { show: { ...showOnlyForCalendarOpeningHour, operation: ['create'] } },
		description: 'Calendar event details (start_time, end_time, doctors, etc.) as JSON object',
		routing: { send: { type: 'body', property: 'calendar_event' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { ...showOnlyForCalendarOpeningHour, operation: ['create', 'update'] } },
		options: [
			{
				displayName: 'Slots Count',
				name: 'slots_count',
				type: 'number',
				default: 1,
				description: 'Maximum number of appointments that can be booked at the same time',
				routing: { send: { type: 'body', property: 'slots_count' } },
			},
			{
				displayName: 'Are Slots Unique',
				name: 'are_slots_unique',
				type: 'boolean',
				default: false,
				description: 'Whether visit types share the same time slots',
				routing: { send: { type: 'body', property: 'are_slots_unique' } },
			},
			{
				displayName: 'Visit Type IDs (JSON)',
				name: 'visit_types',
				type: 'json',
				default: '[]',
				description: 'List of visit type IDs that can be booked during this opening hour',
				routing: { send: { type: 'body', property: 'visit_types' } },
			},
		],
	},
	...createPaginationParameters('calendarOpeningHour'),
];
