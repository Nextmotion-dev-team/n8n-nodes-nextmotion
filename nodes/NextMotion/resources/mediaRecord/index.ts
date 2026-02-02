import type { INodeProperties } from 'n8n-workflow';
import { patientSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForMediaRecord = {
	resource: ['mediaRecord'],
};

export const mediaRecordDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMediaRecord,
		},
		options: [
			createGetManyOperation(
				'mediaRecord',
				'media records',
				'=/open_api/v4/patients/{{$parameter.patientId}}/media_records',
			),
		],
		default: 'getAll',
	},
	{
		...patientSelect,
		displayOptions: {
			show: showOnlyForMediaRecord,
		},
	},
	...createPaginationParameters('mediaRecord'),
];
