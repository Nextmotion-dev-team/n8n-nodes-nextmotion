import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAppointmentRoomUpdate = {
	operation: ['update'],
	resource: ['appointmentRoom'],
};

export const appointmentRoomUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'roomName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForAppointmentRoomUpdate },
		description: 'Display name of the appointment room',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForAppointmentRoomUpdate },
		options: [
			{
				displayName: 'Activate Online Booking',
				name: 'activate_online_booking',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'activate_online_booking' } },
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '',
				placeholder: 'ffffffff',
				routing: { send: { type: 'body', property: 'color' } },
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'position' } },
			},
		],
	},
];
