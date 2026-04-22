import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';
import { visitTypeCreateDescription } from './create';
import { visitTypeUpdateDescription } from './update';

const showOnlyForVisitType = {
	resource: ['visitType'],
};

export const visitTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForVisitType },
		options: [
			createGetManyOperation('visitType', 'visit types', '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_types'),
			createGetOperation('visitType', 'visit type', '=/open_api/v4/visit_types/{{$parameter.visitTypeId}}'),
			createCreateOperation('visit type', '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_types'),
			createUpdateOperation('visit type', '=/open_api/v4/visit_types/{{$parameter.visitTypeId}}'),
			createDeleteOperation('visit type', '=/open_api/v4/visit_types/{{$parameter.visitTypeId}}'),
			{
				name: 'Get Categories',
				value: 'getCategories',
				action: 'Get visit type categories',
				description: 'Get a list of visit type categories for a clinic',
				routing: {
					request: { method: 'GET', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_type_categories' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Get Opening Hours',
				value: 'getOpeningHours',
				action: 'Get available opening hours',
				description: 'Get available opening hours/time slots for visit types',
				routing: {
					request: { method: 'POST', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_types/opening_hours' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Reorder',
				value: 'reorder',
				action: 'Reorder visit types',
				description: "Reorder the clinic's visit types",
				routing: {
					request: { method: 'PUT', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_types/reorder' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
		],
		default: 'getCategories',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForVisitType,
				operation: ['getAll', 'get', 'create', 'update', 'delete', 'getCategories', 'getOpeningHours', 'reorder'],
			},
		},
		description: 'Required for Get Many, Create, Get Categories, Get Opening Hours and Reorder. Optional for other operations.',
	},
	{
		displayName: 'Visit Type',
		name: 'visitTypeId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['visitType'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getVisitTypes', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The visit type to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('visitType', 'getAll'),
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: { show: { ...showOnlyForVisitType, operation: ['getOpeningHours'] } },
		description: 'Start date for searching available slots',
		routing: { send: { type: 'body', property: 'start_date', value: '={{$value.split("T")[0]}}' } },
	},
	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: { show: { ...showOnlyForVisitType, operation: ['getOpeningHours'] } },
		description: 'End date for searching available slots',
		routing: { send: { type: 'body', property: 'end_date', value: '={{$value.split("T")[0]}}' } },
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { ...showOnlyForVisitType, operation: ['getOpeningHours'] } },
		options: [
			{
				displayName: 'Visit Type ID',
				name: 'visit_type_id',
				type: 'string',
				default: '',
				description: 'Filter by specific visit type',
				routing: { send: { type: 'body', property: 'visit_type_id' } },
			},
			{
				displayName: 'Doctor ID',
				name: 'doctor_id',
				type: 'string',
				default: '',
				description: 'Filter by specific doctor',
				routing: { send: { type: 'body', property: 'doctor_id' } },
			},
		],
	},
	{
		displayName: 'Visit Types Order (JSON)',
		name: 'reorderBody',
		type: 'json',
		default: '[\n  { "id": "00000000-0000-0000-0000-000000000000" }\n]',
		required: true,
		displayOptions: { show: { ...showOnlyForVisitType, operation: ['reorder'] } },
		description: 'Array of visit type objects with IDs in the desired order (first item becomes position 1)',
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const raw = this.getNodeParameter('reorderBody', 0);
						const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
						requestOptions.body = parsed;
						return requestOptions;
					},
				],
			},
		},
	},
	...visitTypeCreateDescription,
	...visitTypeUpdateDescription,
];
