import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCommunicationRecord = {
	resource: ['communicationRecord'],
	operation: ['create'],
};

export const communicationRecordCreateDescription: INodeProperties[] = [
	{
		displayName: 'Communication Method',
		name: 'communication_template_kind',
		type: 'options',
		required: true,
		displayOptions: {
			show: showOnlyForCommunicationRecord,
		},
		options: [
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'SMS',
				value: 'sms',
			},
			{
				name: 'WhatsApp',
				value: 'whatsapp',
			},
		],
		default: 'email',
		description: 'Communication record delivery method',
		routing: {
			send: {
				type: 'body',
				property: 'communication_template_kind',
			},
		},
	},
	{
		displayName: 'Communication Type',
		name: 'communication_template_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: showOnlyForCommunicationRecord,
		},
		options: [
			{
				name: 'Administrative Document',
				value: 'administrative_document',
			},
			{
				name: 'Consent Form',
				value: 'consent_form',
			},
			{
				name: 'Invoice',
				value: 'invoice',
			},
			{
				name: 'Prescription',
				value: 'prescription',
			},
			{
				name: 'Prescription Group',
				value: 'prescription_group',
			},
			{
				name: 'Quote',
				value: 'quote',
			},
			{
				name: 'Quote Checkout',
				value: 'quote_checkout',
			},
			{
				name: 'Quote Info Documents',
				value: 'quote_info_documents',
			},
			{
				name: 'Treatment Info Documents',
				value: 'treatment_info_documents',
			},
		],
		default: 'invoice',
		description: 'Type of communication template to use for the record',
		routing: {
			send: {
				type: 'body',
				property: 'communication_template_type',
			},
		},
	},
	{
		displayName: 'Object ID',
		name: 'object',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForCommunicationRecord,
		},
		default: '',
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'Object ID associated with this communication record (e.g., Invoice ID, Quote ID, Prescription ID)',
		routing: {
			send: {
				type: 'body',
				property: 'object',
			},
		},
	},
];
