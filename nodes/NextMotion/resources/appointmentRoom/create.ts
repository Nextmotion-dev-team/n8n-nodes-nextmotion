import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAppointmentRoomCreate = {
	operation: ['create'],
	resource: ['appointmentRoom'],
};

export const appointmentRoomCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForAppointmentRoomCreate },
		description: 'Display name of the appointment room',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForAppointmentRoomCreate },
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
				description: 'RGBA HEX color code',
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
