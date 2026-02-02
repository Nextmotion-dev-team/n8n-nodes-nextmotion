import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForObjectLabel = {
	resource: ['objectLabel'],
};

export const objectLabelDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForObjectLabel,
		},
		options: [
			createGetManyOperation(
				'objectLabel',
				'object labels',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/object_labels',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForObjectLabel,
		},
	},
	...createPaginationParameters('objectLabel'),
];
