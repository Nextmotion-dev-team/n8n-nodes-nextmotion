import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect } from '../../shared/descriptions';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';

const showOnlyForCreditNote = {
	resource: ['creditNote'],
};

export const creditNoteDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCreditNote },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a credit note',
				description: 'Create a new credit note (refund document)',
				routing: {
					request: { method: 'POST', url: '=/open_api/v4/clinics/{{$parameter.clinicId}}/credit_notes' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
		],
		default: 'create',
	},
	{
		...clinicSelect,
		displayOptions: { show: showOnlyForCreditNote },
	},
	{
		displayName: 'Patient',
		name: 'creditNotePatientId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: { show: showOnlyForCreditNote },
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
		description: 'The patient for the credit note',
		routing: { send: { type: 'body', property: 'patient' } },
	},
	{
		displayName: 'Items (JSON)',
		name: 'creditNoteItems',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: { show: showOnlyForCreditNote },
		description: 'Line items for the credit note as JSON array',
		routing: { send: { type: 'body', property: 'items' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForCreditNote },
		options: [
			{
				displayName: 'Invoice ID',
				name: 'invoice',
				type: 'string',
				default: '',
				description: 'Reference to the invoice ID for the refund',
				routing: { send: { type: 'body', property: 'invoice' } },
			},
			{
				displayName: 'Validate',
				name: 'do_validate',
				type: 'boolean',
				default: false,
				description: 'Whether to validate the credit note or leave it as draft',
				routing: { send: { type: 'body', property: 'do_validate' } },
			},
		],
	},
];
