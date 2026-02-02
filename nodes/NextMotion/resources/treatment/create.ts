import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentCreate = {
	operation: ['create'],
	resource: ['treatment'],
};

export const treatmentCreateDescription: INodeProperties[] = [
	{
		displayName: 'Treatment Type ID',
		name: 'treatment_type_id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTreatmentCreate,
		},
		description: 'The ID of the treatment type',
		routing: {
			send: {
				type: 'body',
				property: 'treatment_type_id',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForTreatmentCreate,
		},
		options: [
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 1,
				description: 'Number of units of this treatment',
				routing: {
					send: {
						type: 'body',
						property: 'quantity',
					},
				},
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Additional notes about the treatment',
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					},
				},
			},
		],
	},
];
