import type { INodeProperties } from 'n8n-workflow';

// Common payment method fields
export const paymentMethodFields: INodeProperties[] = [
	{
		displayName: 'Card',
		name: 'card',
		type: 'string',
		default: '',
		placeholder: '100.00',
		description: 'Amount paid using card',
	},
	{
		displayName: 'Cash',
		name: 'cash',
		type: 'string',
		default: '',
		placeholder: '50.00',
		description: 'Amount paid using cash',
	},
	{
		displayName: 'Check',
		name: 'check',
		type: 'string',
		default: '',
		placeholder: '75.00',
		description: 'Amount paid using check',
	},
	{
		displayName: 'Other',
		name: 'other',
		type: 'string',
		default: '',
		placeholder: '25.00',
		description: 'Amount paid using other methods',
	},
	{
		displayName: 'Transfer',
		name: 'transfer',
		type: 'string',
		default: '',
		placeholder: '200.00',
		description: 'Amount paid using bank transfer',
	},
	{
		displayName: 'Voucher Code',
		name: 'voucher_code',
		type: 'string',
		default: '',
		placeholder: 'GIFT2024',
		description: 'Gift card or voucher code',
	},
	{
		displayName: 'Voucher Amount',
		name: 'voucher_amount',
		type: 'string',
		default: '',
		placeholder: '30.00',
		description: 'Amount paid using voucher',
	},
];

// Subpayment fields (for accounting distribution)
export const subpaymentFields: INodeProperties[] = [
	{
		displayName: 'Card',
		name: 'card',
		type: 'string',
		default: '',
		placeholder: '50.00',
		description: 'Amount paid using card',
	},
	{
		displayName: 'Cash',
		name: 'cash',
		type: 'string',
		default: '',
		placeholder: '25.00',
		description: 'Amount paid using cash',
	},
	{
		displayName: 'Check',
		name: 'check',
		type: 'string',
		default: '',
		placeholder: '30.00',
		description: 'Amount paid using check',
	},
	{
		displayName: 'Custom Medium List',
		name: 'custom_medium_list',
		type: 'json',
		default: '[]',
		description: 'Custom payment mediums as JSON array: [{"ID": "uuid", "amount": "10.00"}]',
	},
	{
		displayName: 'Other',
		name: 'other',
		type: 'string',
		default: '',
		placeholder: '15.00',
		description: 'Amount paid using other methods',
	},
	{
		displayName: 'Transfer',
		name: 'transfer',
		type: 'string',
		default: '',
		placeholder: '100.00',
		description: 'Amount paid using bank transfer',
	},
	{
		displayName: 'Voucher Amount',
		name: 'voucher_amount',
		type: 'string',
		default: '',
		placeholder: '20.00',
		description: 'Amount paid using voucher',
	},
	{
		displayName: 'Voucher Code',
		name: 'voucher_code',
		type: 'string',
		default: '',
		placeholder: 'GIFT2024',
		description: 'Gift card or voucher code',
	},
];

// Payment transformation logic (for routing.send.value)
export const paymentTransformationLogic = `={{
	const methods = $value.paymentMethods;
	if (!methods || Object.keys(methods).length === 0) return undefined;
	
	// Extract main payment fields (excluding additionalFields)
	const mainFields = Object.entries(methods)
		.filter(([k, v]) => k !== 'additionalFields' && v)
		.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
	
	// Process additional fields
	const additionalFields = methods.additionalFields || {};
	
	// Handle subpayment transformation
	let processedAdditionalFields = { ...additionalFields };
	if (additionalFields.subpayment?.payment) {
		processedAdditionalFields.subpayment = additionalFields.subpayment.payment.map(p => {
			const entry = {};
			Object.entries(p).forEach(([k, v]) => {
				if (v) entry[k] = v;
			});
			return entry;
		}).filter(entry => Object.keys(entry).length > 0);
		
		// Remove subpayment if empty
		if (processedAdditionalFields.subpayment.length === 0) {
			delete processedAdditionalFields.subpayment;
		}
	}
	
	return { ...mainFields, ...processedAdditionalFields };
}}`;

// Create complete payment field with additional options
export function createPaymentField(description: string): INodeProperties {
	return {
		displayName: 'Payments',
		name: 'payments',
		type: 'fixedCollection',
		default: {},
		description,
		typeOptions: {
			multipleValues: false,
		},
		options: [
			{
				name: 'paymentMethods',
				displayName: 'Payment Methods',
				values: [
					...paymentMethodFields,
					{
						displayName: 'Additional Fields',
						name: 'additionalFields',
						type: 'collection',
						placeholder: 'Add Field',
						default: {},
						options: [
							{
								displayName: 'Autocomplete',
								name: 'autocomplete',
								type: 'json',
								default: '{"a": []}',
								description: 'Answers to deposit invoice template questionnaire',
							},
							{
								displayName: 'Custom Medium List',
								name: 'custom_medium_list',
								type: 'json',
								default: '[]',
								description: 'Custom payment mediums as JSON array: [{"ID": "uuid", "amount": "10.00"}]',
							},
							{
								displayName: 'Deferred',
								name: 'deferred',
								type: 'dateTime',
								default: '',
								description: 'Date when check payment is deferred to (only for check payments)',
							},
							{
								displayName: 'Do Validate',
								name: 'do_validate',
								type: 'boolean',
								default: true,
								description: 'Whether to validate deposit invoice when payment sum != invoice total',
							},
							{
								displayName: 'Subpayment',
								name: 'subpayment',
								type: 'fixedCollection',
								default: {},
								description:
									'Payment split between clinic and provider (for accounting distribution). Index 0 = clinic, index 1 = provider.',
								typeOptions: {
									multipleValues: true,
								},
								options: [
									{
										name: 'payment',
										displayName: 'Payment Split',
										values: subpaymentFields,
									},
								],
							},
						],
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'payments',
				value: paymentTransformationLogic,
			},
		},
	};
}
