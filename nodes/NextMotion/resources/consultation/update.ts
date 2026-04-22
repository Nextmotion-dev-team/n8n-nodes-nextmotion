import type { INodeProperties } from 'n8n-workflow';

const showOnlyForConsultationUpdate = {
	operation: ['update'],
	resource: ['consultation'],
};

export const consultationUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'consultationName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForConsultationUpdate },
		description: 'Display name of the consultation',
		routing: { send: { type: 'body', property: 'name' } },
	},
];
