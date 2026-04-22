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
import { doctorCreateDescription } from './create';
import { doctorUpdateDescription } from './update';

const showOnlyForDoctor = {
	resource: ['doctor'],
};

export const doctorDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDoctor },
		options: [
			createGetManyOperation('doctor', 'doctors', '=/open_api/v4/clinics/{{$parameter.clinicId}}/doctors'),
			createGetOperation('doctor', 'doctor', '=/open_api/v4/doctors/{{$parameter.doctorId}}'),
			createCreateOperation('doctor', '=/open_api/v4/clinics/{{$parameter.clinicId}}/doctors'),
			createUpdateOperation('doctor', '=/open_api/v4/doctors/{{$parameter.doctorId}}'),
			createDeleteOperation('doctor', '=/open_api/v4/doctors/{{$parameter.doctorId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForDoctor,
				operation: ['getAll', 'create'],
			},
		},
		description: 'The clinic to operate on',
	},
	{
		displayName: 'Doctor',
		name: 'doctorId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['doctor'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getDoctors', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The doctor to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('doctor'),
	...doctorCreateDescription,
	...doctorUpdateDescription,
];
