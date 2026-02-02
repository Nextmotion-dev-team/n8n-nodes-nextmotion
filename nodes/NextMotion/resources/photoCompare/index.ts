import type { INodeProperties } from 'n8n-workflow';
import { patientSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForPhotoCompare = {
	resource: ['photoCompare'],
};

export const photoCompareDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPhotoCompare,
		},
		options: [
			createGetManyOperation(
				'photoCompare',
				'photo compares',
				'=/open_api/v4/patients/{{$parameter.patientId}}/photo_compares',
			),
		],
		default: 'getAll',
	},
	{
		...patientSelect,
		displayOptions: {
			show: showOnlyForPhotoCompare,
		},
	},
	...createPaginationParameters('photoCompare'),
];
