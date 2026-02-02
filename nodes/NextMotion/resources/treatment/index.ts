import type { INodeProperties } from 'n8n-workflow';
import { 
	patientSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { treatmentCreateDescription } from './create';
import { treatmentUpdateDescription } from './update';
import { treatmentFiltersDescription } from './filters';

const showOnlyForTreatment = {
	resource: ['treatment'],
};

export const treatmentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTreatment,
		},
		options: [
			createGetManyOperation(
				'treatment',
				'treatments',
				'=/open_api/v4/patients/{{$parameter.patientId}}/treatments',
			),
			createGetOperation(
				'treatment',
				'treatment',
				'=/open_api/v4/treatments/{{$parameter.treatmentId}}',
			),
			createCreateOperation(
				'treatment',
				'=/open_api/v4/patients/{{$parameter.patientId}}/treatments',
			),
			createUpdateOperation(
				'treatment',
				'=/open_api/v4/treatments/{{$parameter.treatmentId}}',
			),
			createDeleteOperation(
				'treatment',
				'=/open_api/v4/treatments/{{$parameter.treatmentId}}',
			),
			{
				name: 'Upload Consent Form',
				value: 'uploadConsentForm',
				action: 'Upload consent form',
				description: 'Upload a consent form for a treatment',
				routing: {
					request: {
						method: 'POST',
						url: '=/open_api/v4/treatments/{{$parameter.treatmentId}}/consent_forms/upload',
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
		default: 'uploadConsentForm',
	},
	{
		...patientSelect,
		displayOptions: {
			show: {
				...showOnlyForTreatment,
				operation: ['getAll', 'create'],
			},
		},
	},
	createIdField('Treatment ID', 'treatmentId', 'treatment', ['get', 'update', 'delete', 'uploadConsentForm']),
	...createPaginationParameters('treatment'),
	...treatmentFiltersDescription,
	...treatmentCreateDescription,
	...treatmentUpdateDescription,
];
