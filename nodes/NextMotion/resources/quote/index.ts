import type { INodeProperties } from 'n8n-workflow';
import { 
	clinicSelect, 
	createGetManyOperation, 
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPostOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { quoteCreateDescription } from './create';
import { quoteUpdateDescription } from './update';

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
			createCreateOperation(
				'quote',
				'=/open_api/v4/consultations/{{$parameter.consultationId}}/quotes',
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
		default: 'create',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForQuote,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'validate'],
			},
		},
		description: 'Required for Get Many. Optional for other operations when using quote ID directly.',
	},
	{
		displayName: 'Quote',
		name: 'quoteId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['get', 'update', 'delete', 'validate'],
			},
		},
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
		description: 'The quote to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('quote'),
	...quoteCreateDescription,
	...quoteUpdateDescription,
];
