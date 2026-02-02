import type { INodeProperties } from 'n8n-workflow';
import { createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

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
		displayName: 'Treatment Type ID',
		name: 'treatmentTypeId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTreatmentPricing,
		},
		description: 'The ID of the treatment type',
	},
	...createPaginationParameters('treatmentPricing'),
];
