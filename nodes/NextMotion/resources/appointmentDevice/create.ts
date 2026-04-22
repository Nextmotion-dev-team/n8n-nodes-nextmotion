import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAppointmentDeviceCreate = {
	operation: ['create'],
	resource: ['appointmentDevice'],
};

export const appointmentDeviceCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForAppointmentDeviceCreate },
		description: 'Display name of the appointment device',
		routing: { send: { type: 'body', property: 'name' } },
	},
];
