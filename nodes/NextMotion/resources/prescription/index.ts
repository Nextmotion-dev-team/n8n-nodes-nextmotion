import type { INodeProperties } from 'n8n-workflow';
import { 
	patientSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';
import { prescriptionCreateDescription } from './create';
import { prescriptionUpdateDescription } from './update';

const showOnlyForPrescription = {
	resource: ['prescription'],
};

export const prescriptionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPrescription,
		},
		options: [
			createGetManyOperation(
				'prescription',
				'prescriptions',
				'=/open_api/v4/patients/{{$parameter.patientId}}/prescriptions',
			),
			createGetOperation(
				'prescription',
				'prescription',
				'=/open_api/v4/prescriptions/{{$parameter.prescriptionId}}',
			),
			createCreateOperation(
				'prescription',
				'=/open_api/v4/patients/{{$parameter.patientId}}/prescriptions',
			),
			createUpdateOperation(
				'prescription',
				'=/open_api/v4/prescriptions/{{$parameter.prescriptionId}}',
			),
			createDeleteOperation(
				'prescription',
				'=/open_api/v4/prescriptions/{{$parameter.prescriptionId}}',
			),
			createPostOperation(
				'Sign',
				'sign',
				'Sign a prescription',
				'Sign an existing prescription',
				'=/open_api/v4/prescriptions/{{$parameter.prescriptionId}}/sign',
			),
		],
		default: 'getAll',
	},
	{
		...patientSelect,
		displayOptions: {
			show: {
				...showOnlyForPrescription,
				operation: ['getAll', 'create'],
			},
		},
	},
	createIdField('Prescription ID', 'prescriptionId', 'prescription', ['get', 'update', 'delete', 'sign']),
	...createPaginationParameters('prescription'),
	...prescriptionCreateDescription,
	...prescriptionUpdateDescription,
];
