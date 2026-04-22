import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentTypeUpdate = {
	operation: ['update'],
	resource: ['treatmentType'],
};

export const treatmentTypeUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'treatmentTypeName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForTreatmentTypeUpdate },
		description: 'Display name of the treatment type',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForTreatmentTypeUpdate },
		options: [
			{
				displayName: 'Create Visit',
				name: 'create_visit',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'create_visit' } },
			},
			{
				displayName: 'Display in Dashboard',
				name: 'display_in_dashboard',
				type: 'boolean',
				default: true,
				routing: { send: { type: 'body', property: 'display_in_dashboard' } },
			},
			{
				displayName: 'Sub Visit Type ID',
				name: 'sub_visit_type',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'sub_visit_type' } },
			},
			{
				displayName: 'Visit Type ID',
				name: 'visit_type',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'visit_type' } },
			},
		],
	},
];
