import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForTreatmentType = {
	resource: ['treatmentType'],
};

export const treatmentTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTreatmentType,
		},
		options: [
			createGetManyOperation(
				'treatmentType',
				'treatment types',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/treatment_types',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForTreatmentType,
		},
	},
	...createPaginationParameters('treatmentType'),
];
