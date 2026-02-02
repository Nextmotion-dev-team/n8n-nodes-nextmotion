import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';

const showOnlyForVisitType = {
	resource: ['visitType'],
};

export const visitTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVisitType,
		},
		options: [
			createGetManyOperation(
				'visitType',
				'visit types',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_types',
			),
			{
				name: 'Get Categories',
				value: 'getCategories',
				action: 'Get visit type categories',
				description: 'Get a list of visit type categories for a clinic',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_type_categories',
					},
					output: {
						postReceive: STANDARD_OUTPUT_POST_RECEIVE,
					},
				},
			},
			{
				name: 'Get Opening Hours',
				value: 'getOpeningHours',
				action: 'Get available opening hours',
				description: 'Get available opening hours/time slots for visit types',
				routing: {
					request: {
						method: 'POST',
						url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_types/opening_hours',
					},
					output: {
						postReceive: STANDARD_OUTPUT_POST_RECEIVE,
					},
				},
			},
		],
		default: 'getCategories',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForVisitType,
		},
	},
	...createPaginationParameters('visitType', 'getAll'),
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForVisitType,
				operation: ['getOpeningHours'],
			},
		},
		description: 'Start date for searching available slots',
		routing: {
			send: {
				type: 'body',
				property: 'start_date',
				value: '={{$value.split("T")[0]}}',
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForVisitType,
				operation: ['getOpeningHours'],
			},
		},
		description: 'End date for searching available slots',
		routing: {
			send: {
				type: 'body',
				property: 'end_date',
				value: '={{$value.split("T")[0]}}',
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForVisitType,
				operation: ['getOpeningHours'],
			},
		},
		options: [
			{
				displayName: 'Visit Type ID',
				name: 'visit_type_id',
				type: 'string',
				default: '',
				description: 'Filter by specific visit type',
				routing: {
					send: {
						type: 'body',
						property: 'visit_type_id',
					},
				},
			},
			{
				displayName: 'Doctor ID',
				name: 'doctor_id',
				type: 'string',
				default: '',
				description: 'Filter by specific doctor',
				routing: {
					send: {
						type: 'body',
						property: 'doctor_id',
					},
				},
			},
		],
	},
];
