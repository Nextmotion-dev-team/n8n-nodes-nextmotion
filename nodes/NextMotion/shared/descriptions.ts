import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { PAGINATION_MAX_LIMIT, PAGINATION_MIN_LIMIT, STANDARD_OUTPUT_POST_RECEIVE } from './constants';

const UUID_VALIDATION = [
	{
		type: 'regex' as const,
		properties: {
			regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
			errorMessage: 'Not a valid UUID',
		},
	},
];

export function createResourceLocator(
	displayName: string,
	name: string,
	searchListMethod: string,
): INodeProperties {
	return {
		displayName,
		name,
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		modes: [
			{
				displayName,
				name: 'list',
				type: 'list',
				placeholder: `Select a ${displayName.toLowerCase()}...`,
				typeOptions: {
					searchListMethod,
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 550e8400-e29b-41d4-a716-446655440000',
				validation: UUID_VALIDATION,
			},
		],
	};
}

export function createPaginationParameters(resource: string, operation: string = 'getAll'): INodeProperties[] {
	const showCondition = {
		operation: [operation],
		resource: [resource],
	};

	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			displayOptions: {
				show: showCondition,
			},
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			routing: {
				send: {
					paginate: '={{ $value }}',
					type: 'query',
					property: 'limit',
					value: String(PAGINATION_MAX_LIMIT),
				},
				operations: {
					pagination: {
						type: 'offset',
						properties: {
							limitParameter: 'limit',
							offsetParameter: 'offset',
							pageSize: PAGINATION_MAX_LIMIT,
							type: 'query',
							rootProperty: 'data',
						},
					},
				},
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			displayOptions: {
				show: {
					...showCondition,
					returnAll: [false],
				},
			},
		typeOptions: {
			minValue: PAGINATION_MIN_LIMIT,
			maxValue: PAGINATION_MAX_LIMIT,
		},
		default: 50,
			routing: {
				send: {
					type: 'query',
					property: 'limit',
				},
				output: {
					maxResults: '={{$value}}',
				},
			},
			description: 'Max number of results to return',
		},
	];
}

export function createIdField(
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
): INodeProperties {
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: operations,
				resource: [resource],
			},
		},
		description: `The ID of the ${displayName.toLowerCase()}`,
	};
}

export function createGetManyOperation(
	resource: string,
	displayName: string,
	url: string,
): INodePropertyOptions {
	return {
		name: 'Get Many',
		value: 'getAll',
		action: `Get many ${displayName.toLowerCase()}`,
		description: `Get a list of ${displayName.toLowerCase()}`,
		routing: {
			request: {
				method: 'GET',
				url,
			},
			output: {
				postReceive: STANDARD_OUTPUT_POST_RECEIVE,
			},
		},
	};
}

export function createGetOperation(
	resource: string,
	displayName: string,
	url: string,
): INodePropertyOptions {
	return {
		name: 'Get',
		value: 'get',
		action: `Get a ${displayName.toLowerCase()}`,
		description: `Get the data of a single ${displayName.toLowerCase()}`,
		routing: {
			request: {
				method: 'GET',
				url,
			},
			output: {
				postReceive: STANDARD_OUTPUT_POST_RECEIVE,
			},
		},
	};
}

export function createPostOperation(
	name: string,
	value: string,
	action: string,
	description: string,
	url: string,
): INodePropertyOptions {
	return {
		name,
		value,
		action,
		description,
		routing: {
			request: {
				method: 'POST',
				url,
			},
			output: {
				postReceive: STANDARD_OUTPUT_POST_RECEIVE,
			},
		},
	};
}

export function createCreateOperation(
	displayName: string,
	url: string,
): INodePropertyOptions {
	return {
		name: 'Create',
		value: 'create',
		action: `Create a ${displayName.toLowerCase()}`,
		description: `Create a new ${displayName.toLowerCase()}`,
		routing: {
			request: {
				method: 'POST',
				url,
			},
			output: {
				postReceive: STANDARD_OUTPUT_POST_RECEIVE,
			},
		},
	};
}

export function createUpdateOperation(
	displayName: string,
	url: string,
): INodePropertyOptions {
	return {
		name: 'Update',
		value: 'update',
		action: `Update a ${displayName.toLowerCase()}`,
		description: `Update an existing ${displayName.toLowerCase()}`,
		routing: {
			request: {
				method: 'PATCH',
				url,
			},
			output: {
				postReceive: STANDARD_OUTPUT_POST_RECEIVE,
			},
		},
	};
}

export function createDeleteOperation(
	displayName: string,
	url: string,
): INodePropertyOptions {
	return {
		name: 'Delete',
		value: 'delete',
		action: `Delete a ${displayName.toLowerCase()}`,
		description: `Delete an existing ${displayName.toLowerCase()}`,
		routing: {
			request: {
				method: 'DELETE',
				url,
			},
			output: {
				postReceive: STANDARD_OUTPUT_POST_RECEIVE,
			},
		},
	};
}

export const clinicSelect = createResourceLocator('Clinic', 'clinicId', 'getClinics');
export const patientSelect = createResourceLocator('Patient', 'patientId', 'getPatients');
export const doctorSelect = createResourceLocator('Doctor', 'doctorId', 'getDoctors');
