import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

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
				'=/open_api/v4/treatment_types/{{$parameter.treatmentTypeId}}/pricings',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForTreatmentPricing,
		},
	},
	{
		displayName: 'Treatment Type',
		name: 'treatmentTypeId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForTreatmentPricing,
		},
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
		description: 'The treatment type to get pricings for (select clinic first)',
	},
	...createPaginationParameters('treatmentPricing'),
];
