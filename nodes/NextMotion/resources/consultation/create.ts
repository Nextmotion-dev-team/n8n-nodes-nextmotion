import type { INodeProperties } from 'n8n-workflow';

const showOnlyForConsultationCreate = {
	operation: ['create'],
	resource: ['consultation'],
};

export const consultationCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForConsultationCreate },
		description: 'Display name of the consultation group',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Patient',
		name: 'consultationPatientId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: { show: showOnlyForConsultationCreate },
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getPatients', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The patient to associate with this consultation',
		routing: { send: { type: 'body', property: 'patient' } },
	},
];
