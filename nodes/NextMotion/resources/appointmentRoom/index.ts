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
import { appointmentRoomCreateDescription } from './create';
import { appointmentRoomUpdateDescription } from './update';

const showOnlyForAppointmentRoom = {
	resource: ['appointmentRoom'],
};

export const appointmentRoomDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForAppointmentRoom },
		options: [
			createGetManyOperation('appointmentRoom', 'appointment rooms', '=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_rooms'),
			createGetOperation('appointmentRoom', 'appointment room', '=/open_api/v4/appointment_rooms/{{$parameter.appointmentRoomId}}'),
			createCreateOperation('appointment room', '=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_rooms'),
			createUpdateOperation('appointment room', '=/open_api/v4/appointment_rooms/{{$parameter.appointmentRoomId}}'),
			createDeleteOperation('appointment room', '=/open_api/v4/appointment_rooms/{{$parameter.appointmentRoomId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForAppointmentRoom,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Appointment Room',
		name: 'appointmentRoomId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['appointmentRoom'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getAppointmentRooms', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The appointment room to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('appointmentRoom'),
	...appointmentRoomCreateDescription,
	...appointmentRoomUpdateDescription,
];
