import type { INodeProperties } from 'n8n-workflow';
import { patientSelect } from '../../shared/descriptions';

const showOnlyForQuote = {
	resource: ['quote'],
	operation: ['create'],
};

export const quoteCreateDescription: INodeProperties[] = [
	{
		...patientSelect,
		displayOptions: {
			show: showOnlyForQuote,
		},
		description: 'The patient for this quote. Requires clinic to be selected first.',
	},
	{
		displayName: 'Consultation',
		name: 'consultationId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForQuote,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getConsultations',
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
		description: 'The consultation to create the quote from (select patient first)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForQuote,
		},
		options: [
			{
				displayName: 'Add Treatments to Journey',
				name: 'add_treatments_to_journey',
				type: 'boolean',
				default: false,
				description: 'Whether to add treatments to calendar journey',
				routing: {
					send: {
						type: 'body',
						property: 'add_treatments_to_journey',
					},
				},
			},
			{
				displayName: 'Autocomplete',
				name: 'autocomplete',
				type: 'json',
				default: '{"a": []}',
				description: 'Answers to document template questionnaire. Format: {"a": [{"q_id": "question_id", "val": "answer"}]}.',
				routing: {
					send: {
						type: 'body',
						property: 'autocomplete',
					},
				},
			},
			{
				displayName: 'Do Validate',
				name: 'do_validate',
				type: 'boolean',
				default: false,
				description: 'Whether to validate the quote immediately after creation',
				routing: {
					send: {
						type: 'body',
						property: 'do_validate',
					},
				},
			},
			{
				displayName: 'Document Template',
				name: 'document_template',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getQuoteDocumentTemplates',
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
				description: 'Document template to render the quote PDF',
				routing: {
					send: {
						type: 'body',
						property: 'document_template',
					},
				},
			},
			{
				displayName: 'Free Text',
				name: 'free_text',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Additional free text content for the quote',
				routing: {
					send: {
						type: 'body',
						property: 'free_text',
					},
				},
			},
			{
				displayName: 'Ignore Social Security Treatment Price',
				name: 'ignore_social_security_treatment_price',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore default social security treatment price (deprecated)',
				routing: {
					send: {
						type: 'body',
						property: 'ignore_social_security_treatment_price',
					},
				},
			},
			{
				displayName: 'Invoice',
				name: 'invoice',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getInvoices',
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
				description: 'Invoice to create quote from (requires clinic and patient to be selected)',
				routing: {
					send: {
						type: 'body',
						property: 'invoice',
					},
				},
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Additional notes for the quote',
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					},
				},
			},
			{
				displayName: 'Rebate',
				name: 'rebate',
				type: 'string',
				default: '0.00',
				placeholder: '10.50',
				description: 'Absolute rebate amount (decimal string). Use either this OR Rebate Percent, not both.',
				routing: {
					send: {
						type: 'body',
						property: 'rebate',
					},
				},
			},
			{
				displayName: 'Rebate Details',
				name: 'rebate_details',
				type: 'string',
				default: '',
				description: 'Comments regarding the rebate',
				routing: {
					send: {
						type: 'body',
						property: 'rebate_details',
					},
				},
			},
			{
				displayName: 'Rebate Percent',
				name: 'rebate_percent',
				type: 'string',
				default: '',
				placeholder: '10.00',
				description: 'Percentage rebate (0.00 to 100.00). Use either this OR Rebate, not both.',
				routing: {
					send: {
						type: 'body',
						property: 'rebate_percent',
					},
				},
			},
			{
				displayName: 'Template Text',
				name: 'template_text',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Template text for the quote',
				routing: {
					send: {
						type: 'body',
						property: 'template_text',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Short title for the quote',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'Treatments',
				name: 'treatments',
				type: 'fixedCollection',
				default: {},
				description: 'Treatments to include in the quote (cannot be provided if invoice is specified)',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'treatment',
						displayName: 'Treatment',
						values: [
							{
								displayName: 'Treatment',
								name: 'id',
								type: 'resourceLocator',
								default: { mode: 'list', value: '' },
								required: true,
								modes: [
									{
										displayName: 'From List',
										name: 'list',
										type: 'list',
										typeOptions: {
											searchListMethod: 'getTreatments',
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
								description: 'Treatment from the patient (filtered by consultation ID)',
							},
							{
								displayName: 'Additional Fields',
								name: 'additionalFields',
								type: 'collection',
								placeholder: 'Add Field',
								default: {},
								options: [
									{
										displayName: 'Price',
										name: 'price',
										type: 'string',
										default: '',
										placeholder: '150.00',
										description: 'Override unit price (leave empty to use treatment default)',
									},
									{
										displayName: 'Quantity',
										name: 'quantity',
										type: 'string',
										default: '',
										placeholder: '1',
										description: 'Override quantity (leave empty to use treatment default)',
									},
									{
										displayName: 'Rebate',
										name: 'rebate',
										type: 'string',
										default: '',
										placeholder: '10.00',
										description: 'Override rebate amount (leave empty for no rebate). Use either this OR Rebate Percent, not both.',
									},
									{
										displayName: 'Rebate Percent',
										name: 'rebate_percent',
										type: 'string',
										default: '',
										placeholder: '15.00',
										description: 'Override rebate percent (leave empty for no rebate). Use either this OR Rebate, not both.',
									},
									{
										displayName: 'VAT Rate',
										name: 'vat_rate',
										type: 'string',
										default: '',
										placeholder: '20.0',
										description: 'Override VAT rate (leave empty to use treatment default)',
									},
								],
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'treatments',
						value: '={{$value.treatment.map(t => ({ id: t.id, ...t.additionalFields }))}}',
					},
				},
			},
			{
				displayName: 'Voucher Code',
				name: 'voucher_code',
				type: 'string',
				default: '',
				description: 'Gift card/voucher code',
				routing: {
					send: {
						type: 'body',
						property: 'voucher_code',
					},
				},
			},
		],
	},
];
