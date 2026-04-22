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
import { consultationCreateDescription } from './create';
import { consultationUpdateDescription } from './update';

const showOnlyForConsultation = {
	resource: ['consultation'],
};

export const consultationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForConsultation },
		options: [
			createGetManyOperation(
				'consultation',
				'consultations',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/consultations',
			),
			{
				name: 'Get Many by Patient',
				value: 'getAllByPatient',
				action: 'Get many consultations by patient',
				description: 'Get a list of consultations for a specific patient',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/consultations',
						qs: {
							patient: '={{$parameter.patientId}}',
						},
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
			createGetOperation('consultation', 'consultation', '=/open_api/v4/consultations/{{$parameter.consultationId}}'),
			createCreateOperation('consultation', '=/open_api/v4/clinics/{{$parameter.clinicId}}/consultations'),
			createUpdateOperation('consultation', '=/open_api/v4/consultations/{{$parameter.consultationId}}'),
			createDeleteOperation('consultation', '=/open_api/v4/consultations/{{$parameter.consultationId}}'),
		],
		default: 'getAllByPatient',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForConsultation,
				operation: ['getAll', 'getAllByPatient', 'create'],
			},
		},
		description: 'The clinic to operate on',
	},
	{
		...patientSelect,
		displayOptions: {
			show: {
				...showOnlyForConsultation,
				operation: ['getAllByPatient'],
			},
		},
	},
	{
		displayName: 'Consultation',
		name: 'consultationId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['consultation'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getConsultations', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The consultation to operate on (select patient first for dropdown)',
	},
	...createPaginationParameters('consultation', 'getAll'),
	...consultationCreateDescription,
	...consultationUpdateDescription,
];
