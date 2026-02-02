import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForDoctor = {
	resource: ['doctor'],
};

export const doctorDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDoctor,
		},
		options: [
			createGetManyOperation(
				'doctor',
				'doctors',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/doctors',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForDoctor,
		},
	},
	...createPaginationParameters('doctor'),
];
