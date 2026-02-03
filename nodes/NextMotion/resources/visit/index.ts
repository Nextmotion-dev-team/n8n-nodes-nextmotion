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
import { visitCreateDescription } from './create';
import { visitFiltersDescription } from './filters';
import { visitUpdateDescription } from './update';

const showOnlyForVisit = {
	resource: ['visit'],
};

export const visitDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVisit,
		},
		options: [
			createGetManyOperation(
				'visit',
				'visits',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/visits',
			),
			createGetOperation(
				'visit',
				'visit',
				'=/open_api/v4/visits/{{$parameter.visitId}}',
			),
			createCreateOperation(
				'visit',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/visits',
			),
			createUpdateOperation(
				'visit',
				'=/open_api/v4/visits/{{$parameter.visitId}}',
			),
			createDeleteOperation(
				'visit',
				'=/open_api/v4/visits/{{$parameter.visitId}}',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForVisit,
				operation: ['getAll', 'create', 'get', 'update', 'delete'],
			},
		},
		description: 'Required for Get Many and Create. Optional for Get/Update/Delete when using visit ID directly.',
	},
	{
		displayName: 'Visit',
		name: 'visitId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['visit'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getVisits',
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
		description: 'The visit to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('visit'),
	...visitCreateDescription,
	...visitFiltersDescription,
	...visitUpdateDescription,
];
