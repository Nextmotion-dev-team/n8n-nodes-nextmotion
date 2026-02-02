import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrescriptionUpdate = {
	operation: ['update'],
	resource: ['prescription'],
};

export const prescriptionUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForPrescriptionUpdate,
		},
		options: [
			{
				displayName: 'Medication Name',
				name: 'medication_name',
				type: 'string',
				default: '',
				description: 'The name of the medication',
				routing: {
					send: {
						type: 'body',
						property: 'medication_name',
					},
				},
			},
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
