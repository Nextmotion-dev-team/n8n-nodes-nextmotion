import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
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
		required: false,
		displayOptions: {
			show: {
				...showOnlyForPatient,
				operation: ['getAll', 'create', 'update', 'get', 'delete', 'getStats'],
			},
		},
		description: 'Required for Get Many and Create. Optional for Get/Update/Delete/Get Stats when using patient ID directly.',
	},
	{
		displayName: 'Patient',
		name: 'patientId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['patient'],
				operation: ['get', 'update', 'delete', 'getStats'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getPatients',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The patient to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('patient'),
	...patientFiltersDescription,
	...patientCreateDescription,
	...patientUpdateDescription,
];
