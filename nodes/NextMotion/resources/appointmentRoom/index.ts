import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForAppointmentRoom = {
	resource: ['appointmentRoom'],
};

export const appointmentRoomDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAppointmentRoom,
		},
		options: [
			createGetManyOperation(
				'appointmentRoom',
				'appointment rooms',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_rooms',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForAppointmentRoom,
		},
	},
	...createPaginationParameters('appointmentRoom'),
];
