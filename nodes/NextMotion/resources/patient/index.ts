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
import { patientFiltersDescription } from './filters';
import { patientCreateDescription } from './create';
import { patientUpdateDescription } from './update';

const showOnlyForPatient = {
	resource: ['patient'],
};

export const patientDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPatient,
		},
		options: [
			createGetManyOperation(
				'patient',
				'patients',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/patients',
			),
			createGetOperation(
				'patient',
				'patient',
				'=/open_api/v4/patients/{{$parameter.patientId}}',
			),
			createCreateOperation(
				'patient',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/patients',
			),
			createUpdateOperation(
				'patient',
				'=/open_api/v4/patients/{{$parameter.patientId}}',
			),
			createDeleteOperation(
				'patient',
				'=/open_api/v4/patients/{{$parameter.patientId}}',
			),
			{
				name: 'Get Stats',
				value: 'getStats',
				action: 'Get patient statistics',
				description: 'Get statistics for a patient',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/patients/{{$parameter.patientId}}/stats',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'getStats',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForPatient,
				operation: ['getAll', 'create'],
			},
		},
	},
	createIdField('Patient ID', 'patientId', 'patient', ['get', 'update', 'delete', 'getStats']),
	...createPaginationParameters('patient'),
	...patientFiltersDescription,
	...patientCreateDescription,
	...patientUpdateDescription,
];
