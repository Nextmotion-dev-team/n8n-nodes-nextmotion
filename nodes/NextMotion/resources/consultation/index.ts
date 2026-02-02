import type { INodeProperties } from 'n8n-workflow';
import { patientSelect, createPaginationParameters, createIdField } from '../../shared/descriptions';

const showOnlyForConsultation = {
	resource: ['consultation'],
};

export const consultationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForConsultation,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many consultations',
				description: 'Get a list of consultations for a patient',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/patients/{{$parameter.patientId}}/consultations',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
			{
				name: 'Create Invoice',
				value: 'createInvoice',
				action: 'Create invoice from consultation',
				description: 'Create an invoice from a consultation',
				routing: {
					request: {
						method: 'POST',
						url: '=/open_api/v4/consultations/{{$parameter.consultationId}}/invoices',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
			{
				name: 'Create Quote',
				value: 'createQuote',
				action: 'Create quote from consultation',
				description: 'Create a quote from a consultation',
				routing: {
					request: {
						method: 'POST',
						url: '=/open_api/v4/consultations/{{$parameter.consultationId}}/quotes',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...patientSelect,
		displayOptions: {
			show: {
				...showOnlyForConsultation,
				operation: ['getAll'],
			},
		},
	},
	createIdField('Consultation ID', 'consultationId', 'consultation', ['createInvoice', 'createQuote']),
	...createPaginationParameters('consultation'),
];
