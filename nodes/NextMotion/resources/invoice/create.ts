import type { INodeProperties } from 'n8n-workflow';
import { patientSelect } from '../../shared/descriptions';
import { createPaymentField } from '../../shared/paymentFields';

const showOnlyForInvoice = {
	resource: ['invoice'],
	operation: ['create'],
};

const paymentsField = createPaymentField('Payment methods and amounts for the invoice');

export const invoiceCreateDescription: INodeProperties[] = [
	{
		...patientSelect,
		displayOptions: {
			show: showOnlyForInvoice,
		},
		description: 'The patient for this invoice. Requires clinic to be selected first.',
	},
	{
		displayName: 'Consultation',
		name: 'consultationId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForInvoice,
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
		description: 'The consultation to create the invoice from (select patient first)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForInvoice,
		},
		options: [
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
				displayName: 'Created Time',
				name: 'created_time',
				type: 'dateTime',
				default: '',
				description: 'Invoice issue date',
				routing: {
					send: {
						type: 'body',
						property: 'created_time',
						value: '={{$value.split("T")[0]}}',
					},
				},
			},
			{
				displayName: 'Do Validate',
				name: 'do_validate',
				type: 'boolean',
				default: false,
				description: 'Whether to validate the invoice immediately after creation',
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
							searchListMethod: 'getInvoiceDocumentTemplates',
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
				description: 'Document template to render the invoice PDF',
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
				description: 'Additional free text content for the invoice',
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
				displayName: 'Invoiced Time',
				name: 'invoiced_time',
				type: 'dateTime',
				default: '',
				description: 'Invoice sale date',
				routing: {
					send: {
						type: 'body',
						property: 'invoiced_time',
						value: '={{$value.split("T")[0]}}',
					},
				},
			},
			paymentsField,
			{
				displayName: 'Quote',
				name: 'quote',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getQuotes',
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
				description: 'Quote to create invoice from (requires clinic and patient to be selected)',
				routing: {
					send: {
						type: 'body',
						property: 'quote',
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
				displayName: 'Treatments',
				name: 'treatments',
				type: 'fixedCollection',
				default: {},
				description: 'Treatments to include in the invoice (cannot be provided if quote is specified)',
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
