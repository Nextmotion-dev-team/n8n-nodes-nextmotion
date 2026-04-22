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
import { appointmentDeviceCreateDescription } from './create';
import { appointmentDeviceUpdateDescription } from './update';

const showOnlyForAppointmentDevice = {
	resource: ['appointmentDevice'],
};

export const appointmentDeviceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForAppointmentDevice },
		options: [
			createGetManyOperation('appointmentDevice', 'appointment devices', '=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_devices'),
			createGetOperation('appointmentDevice', 'appointment device', '=/open_api/v4/appointment_devices/{{$parameter.appointmentDeviceId}}'),
			createCreateOperation('appointment device', '=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_devices'),
			createUpdateOperation('appointment device', '=/open_api/v4/appointment_devices/{{$parameter.appointmentDeviceId}}'),
			createDeleteOperation('appointment device', '=/open_api/v4/appointment_devices/{{$parameter.appointmentDeviceId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForAppointmentDevice,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Appointment Device',
		name: 'appointmentDeviceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['appointmentDevice'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getAppointmentDevices', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The appointment device to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('appointmentDevice'),
	...appointmentDeviceCreateDescription,
	...appointmentDeviceUpdateDescription,
];
