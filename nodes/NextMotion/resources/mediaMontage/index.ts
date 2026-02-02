import type { INodeProperties } from 'n8n-workflow';
import { patientSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForMediaMontage = {
	resource: ['mediaMontage'],
};

export const mediaMontageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMediaMontage,
		},
		options: [
			createGetManyOperation(
				'mediaMontage',
				'media montages',
				'=/open_api/v4/patients/{{$parameter.patientId}}/media_montages',
			),
		],
		default: 'getAll',
	},
	{
		...patientSelect,
		displayOptions: {
			show: showOnlyForMediaMontage,
		},
	},
	...createPaginationParameters('mediaMontage'),
];
