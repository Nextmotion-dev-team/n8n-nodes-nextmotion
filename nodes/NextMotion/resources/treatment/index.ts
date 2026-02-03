import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect,
	patientSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { treatmentCreateDescription } from './create';
import { treatmentUpdateDescription } from './update';
import { treatmentFiltersDescription } from './filters';
import { treatmentUploadConsentFormDescription } from './uploadConsentForm';

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
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForTreatment,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'uploadConsentForm'],
			},
		},
		description: 'Required when using dropdown selection for treatments',
	},
	{
		...patientSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForTreatment,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'uploadConsentForm'],
			},
		},
		description: 'Required when using dropdown selection for treatments. For Create/GetAll: required. For Get/Update/Delete: optional if using treatment ID directly.',
	},
	{
		displayName: 'Treatment',
		name: 'treatmentId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['treatment'],
				operation: ['get', 'update', 'delete', 'uploadConsentForm'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getTreatments',
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
		description: 'The treatment to operate on (select patient first)',
	},
	...createPaginationParameters('treatment'),
	...treatmentFiltersDescription,
	...treatmentCreateDescription,
	...treatmentUpdateDescription,
	...treatmentUploadConsentFormDescription,
];
