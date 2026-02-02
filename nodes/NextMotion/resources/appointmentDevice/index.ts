import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForAppointmentDevice = {
	resource: ['appointmentDevice'],
};

export const appointmentDeviceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAppointmentDevice,
		},
		options: [
			createGetManyOperation(
				'appointmentDevice',
				'appointment devices',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_devices',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForAppointmentDevice,
		},
	},
	...createPaginationParameters('appointmentDevice'),
];
