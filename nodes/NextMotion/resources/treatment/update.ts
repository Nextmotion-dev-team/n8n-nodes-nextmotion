import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTreatmentUpdate = {
	operation: ['update'],
	resource: ['treatment'],
};

export const treatmentUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForTreatmentUpdate,
		},
		options: [
			{
				displayName: 'Assistant',
				name: 'assistant',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getDoctors',
							searchable: true,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				description: 'Assistant provider ID',
				routing: {
					send: {
						type: 'body',
						property: 'assistant',
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
			{
				displayName: 'Provider',
				name: 'provider',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getDoctors',
							searchable: true,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				description: 'Provider ID',
				routing: {
					send: {
						type: 'body',
						property: 'provider',
					},
				},
			},
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
				displayName: 'Secretary',
				name: 'secretary',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getDoctors',
							searchable: true,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				description: 'Secretary ID',
				routing: {
					send: {
						type: 'body',
						property: 'secretary',
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				description: 'Additional text',
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
			},
			{
				displayName: 'Treatment Pricing',
				name: 'treatment_pricing',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getTreatmentPricings',
							searchable: true,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				description: 'Pricing option for the treatment (select treatment type first to see options)',
				routing: {
					send: {
						type: 'body',
						property: 'treatment_pricing',
					},
				},
			},
			{
				displayName: 'Treatment Time',
				name: 'treatment_time',
				type: 'dateTime',
				default: '',
				description: 'Date and time of the treatment',
				routing: {
					send: {
						type: 'body',
						property: 'treatment_time',
					},
				},
			},
			{
				displayName: 'Treatment Type',
				name: 'treatment_type',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getTreatmentTypes',
							searchable: true,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'treatment_type',
					},
				},
			},
			{
				displayName: 'Zone',
				name: 'zone',
				type: 'string',
				default: '',
				placeholder: 'e.g. Face, Left arm, Lower back',
				description: 'Anatomical zone/region where the treatment was performed',
				routing: {
					send: {
						type: 'body',
						property: 'zone',
					},
				},
			},
		],
	},
];
