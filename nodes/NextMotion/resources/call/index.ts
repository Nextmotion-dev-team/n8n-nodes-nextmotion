import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createCreateOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForCall = {
	resource: ['call'],
};

export const callDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCall,
		},
		options: [
			createGetManyOperation(
				'call',
				'calls',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/calls',
			),
			createCreateOperation(
				'call',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/calls',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForCall,
		},
	},
	...createPaginationParameters('call'),
];
