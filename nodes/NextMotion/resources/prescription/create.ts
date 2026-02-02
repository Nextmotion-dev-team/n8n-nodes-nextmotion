import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrescriptionCreate = {
	operation: ['create'],
	resource: ['prescription'],
};

export const prescriptionCreateDescription: INodeProperties[] = [
	{
		displayName: 'Medication Name',
		name: 'medication_name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForPrescriptionCreate,
		},
		description: 'The name of the medication',
		routing: {
			send: {
				type: 'body',
				property: 'medication_name',
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
			show: showOnlyForPrescriptionCreate,
		},
		options: [
			{
				displayName: 'Dosage',
				name: 'dosage',
				type: 'string',
				default: '',
				description: 'The dosage instructions',
				routing: {
					send: {
						type: 'body',
						property: 'dosage',
					},
				},
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'string',
				default: '',
				description: 'Duration of the prescription',
				routing: {
					send: {
						type: 'body',
						property: 'duration',
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
				description: 'Additional notes about the prescription',
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
