import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createGetOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForSubVisitType = {
	resource: ['subVisitType'],
};

export const subVisitTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSubVisitType,
		},
		options: [
			createGetManyOperation(
				'subVisitType',
				'sub visit types',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/sub_visit_types',
			),
			createGetOperation(
				'subVisitType',
				'sub visit type',
				'=/open_api/v4/sub_visit_types/{{$parameter.subVisitTypeId}}',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForSubVisitType,
				operation: ['getAll', 'get'],
			},
		},
		description: 'Required for Get Many. Optional for Get when using sub visit type ID directly.',
	},
	{
		displayName: 'Sub Visit Type',
		name: 'subVisitTypeId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['subVisitType'],
				operation: ['get'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getSubVisitTypes',
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
		description: 'The sub visit type to get (select clinic first for dropdown)',
	},
	...createPaginationParameters('subVisitType'),
];
