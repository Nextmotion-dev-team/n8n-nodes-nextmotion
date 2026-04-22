import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, patientSelect } from '../../shared/descriptions';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';

const showOnlyForMedicalHistory = {
	resource: ['medicalHistory'],
};

export const medicalHistoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForMedicalHistory },
		options: [
			{
				name: 'Get (Clinic Template)',
				value: 'getClinic',
				action: 'Get clinic medical history template',
				description: 'Get the medical history template configuration for a clinic',
				routing: {
					request: { method: 'GET', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/medical_history' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Update (Clinic Template)',
				value: 'updateClinic',
				action: 'Update clinic medical history template',
				description: 'Update the medical history template configuration for a clinic',
				routing: {
					request: { method: 'PUT', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/medical_history' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Get (Patient)',
				value: 'getPatient',
				action: 'Get patient medical history',
				description: 'Get the medical history data for a patient',
				routing: {
					request: { method: 'GET', url: '=/open_api/v4/patients/{{$parameter.patientId}}/medical_history' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Update (Patient)',
				value: 'updatePatient',
				action: 'Update patient medical history',
				description: 'Update the medical history data for a patient',
				routing: {
					request: { method: 'PUT', url: '=/open_api/v4/patients/{{$parameter.patientId}}/medical_history' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
		],
		default: 'getPatient',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForMedicalHistory,
				operation: ['getClinic', 'updateClinic'],
			},
		},
	},
	{
		...patientSelect,
		displayOptions: {
			show: {
				...showOnlyForMedicalHistory,
				operation: ['getPatient', 'updatePatient'],
			},
		},
	},
	{
		displayName: 'Medical History Template (JSON)',
		name: 'medical_history_tmpl',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: { show: { ...showOnlyForMedicalHistory, operation: ['updateClinic'] } },
		description: 'Medical history template configuration as JSON object',
		routing: { send: { type: 'body', property: 'medical_history_tmpl' } },
	},
	{
		displayName: 'Medical History (JSON)',
		name: 'medical_history',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: { show: { ...showOnlyForMedicalHistory, operation: ['updatePatient'] } },
		description: 'Patient medical history data as JSON object',
		routing: { send: { type: 'body', property: 'medical_history' } },
	},
];
