import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createGetOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForTreatmentPricing = {
	resource: ['treatmentPricing'],
};

export const treatmentPricingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTreatmentPricing,
		},
		options: [
			createGetManyOperation(
				'treatmentPricing',
				'treatment pricings',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/treatment_pricings',
			),
			createGetOperation(
				'treatmentPricing',
				'treatment pricing',
				'=/open_api/v4/treatment_pricings/{{$parameter.treatmentPricingId}}',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForTreatmentPricing,
				operation: ['getAll', 'get'],
			},
		},
		description: 'Required for Get Many. Optional for Get when using treatment pricing ID directly.',
	},
	{
		displayName: 'Treatment Pricing',
		name: 'treatmentPricingId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['treatmentPricing'],
				operation: ['get'],
			},
		},
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
		description: 'The treatment pricing to get (select clinic first for dropdown)',
	},
	...createPaginationParameters('treatmentPricing'),
];
