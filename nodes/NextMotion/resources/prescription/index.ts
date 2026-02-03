import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect,
	patientSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
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
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForPrescription,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'sign'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations when using prescription ID directly.',
	},
	{
		...patientSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForPrescription,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'sign'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations when using prescription ID directly.',
	},
	{
		displayName: 'Prescription',
		name: 'prescriptionId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['prescription'],
				operation: ['get', 'update', 'delete', 'sign'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getPrescriptions',
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
		description: 'The prescription to operate on (select patient first for dropdown)',
	},
	...createPaginationParameters('prescription'),
	...prescriptionCreateDescription,
	...prescriptionUpdateDescription,
];
