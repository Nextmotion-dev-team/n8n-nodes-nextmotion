import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAppointmentDeviceUpdate = {
	operation: ['update'],
	resource: ['appointmentDevice'],
};

export const appointmentDeviceUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'deviceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForAppointmentDeviceUpdate },
		description: 'Display name of the appointment device',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForAppointmentDeviceUpdate },
		options: [
			{
				displayName: 'Sub Visit Type IDs (JSON)',
				name: 'sub_visit_types',
				type: 'json',
				default: '[]',
				description: 'Array of sub visit type IDs associated with this device',
				routing: { send: { type: 'body', property: 'sub_visit_types' } },
			},
			{
				displayName: 'Visit Type IDs (JSON)',
				name: 'visit_types',
				type: 'json',
				default: '[]',
				description: 'Array of visit type IDs associated with this device',
				routing: { send: { type: 'body', property: 'visit_types' } },
			},
		],
	},
];
