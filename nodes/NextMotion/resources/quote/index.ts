import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
	createIdField,
} from '../../shared/descriptions';

const showOnlyForQuote = {
	resource: ['quote'],
};

export const quoteDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForQuote,
		},
		options: [
			createGetManyOperation(
				'quote',
				'quotes',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/quotes',
			),
			createGetOperation(
				'quote',
				'quote',
				'=/open_api/v4/quotes/{{$parameter.quoteId}}',
			),
			createUpdateOperation(
				'quote',
				'=/open_api/v4/quotes/{{$parameter.quoteId}}',
			),
			createDeleteOperation(
				'quote',
				'=/open_api/v4/quotes/{{$parameter.quoteId}}',
			),
			createPostOperation(
				'Validate',
				'validate',
				'Validate a quote',
				'Validate and finalize a quote',
				'=/open_api/v4/quotes/{{$parameter.quoteId}}/validate',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForQuote,
				operation: ['getAll'],
			},
		},
	},
	...createPaginationParameters('quote'),
	createIdField('Quote ID', 'quoteId', 'quote', ['get', 'update', 'delete', 'validate']),
];
