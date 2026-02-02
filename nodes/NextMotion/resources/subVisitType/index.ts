import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

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
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForSubVisitType,
		},
	},
	...createPaginationParameters('subVisitType'),
];
