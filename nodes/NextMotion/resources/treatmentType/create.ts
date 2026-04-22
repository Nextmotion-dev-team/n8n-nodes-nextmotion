import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentTypeCreate = {
	operation: ['create'],
	resource: ['treatmentType'],
};

export const treatmentTypeCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForTreatmentTypeCreate },
		description: 'Display name of the treatment type',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForTreatmentTypeCreate },
		options: [
			{
				displayName: 'Create Visit',
				name: 'create_visit',
				type: 'boolean',
				default: false,
				description: 'Whether booking this treatment creates a visit',
				routing: { send: { type: 'body', property: 'create_visit' } },
			},
			{
				displayName: 'Display in Dashboard',
				name: 'display_in_dashboard',
				type: 'boolean',
				default: true,
				description: 'Whether to show this treatment type in the dashboard',
				routing: { send: { type: 'body', property: 'display_in_dashboard' } },
			},
			{
				displayName: 'Sub Visit Type ID',
				name: 'sub_visit_type',
				type: 'string',
				default: '',
				description: 'Default sub-visit type ID used when creating visits from treatment',
				routing: { send: { type: 'body', property: 'sub_visit_type' } },
			},
			{
				displayName: 'Visit Type ID',
				name: 'visit_type',
				type: 'string',
				default: '',
				description: 'Default visit type ID used when creating visits from treatment',
				routing: { send: { type: 'body', property: 'visit_type' } },
			},
		],
	},
];
