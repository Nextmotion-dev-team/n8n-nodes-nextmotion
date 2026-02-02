import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation, 
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { visitFiltersDescription } from './filters';

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
		displayOptions: {
			show: {
				...showOnlyForVisit,
				operation: ['getAll', 'create'],
			},
		},
	},
	createIdField('Visit ID', 'visitId', 'visit', ['get', 'update', 'delete']),
	...createPaginationParameters('visit'),
	...visitFiltersDescription,
];
