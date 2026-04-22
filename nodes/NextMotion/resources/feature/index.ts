import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForFeature = {
	resource: ['feature'],
};

export const featureDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForFeature },
		options: [
			createGetManyOperation('feature', 'features', '=/open_api/v4/clinics/{{$parameter.clinicId}}/features'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: { show: showOnlyForFeature },
	},
	...createPaginationParameters('feature'),
];
