import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForGlobalProduct = {
	resource: ['globalProduct'],
};

export const globalProductDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForGlobalProduct },
		options: [
			createGetManyOperation('globalProduct', 'global products', '=/open_api/v4/clinics/{{$parameter.clinicId}}/global_products'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: { show: showOnlyForGlobalProduct },
	},
	...createPaginationParameters('globalProduct'),
];
