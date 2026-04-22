import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
} from '../../shared/descriptions';
import { productCreateDescription } from './create';
import { productUpdateDescription } from './update';

const showOnlyForProduct = {
	resource: ['product'],
};

export const productDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForProduct },
		options: [
			createGetManyOperation('product', 'products', '=/open_api/v4/clinics/{{$parameter.clinicId}}/products'),
			createGetOperation('product', 'product', '=/open_api/v4/products/{{$parameter.productId}}'),
			createCreateOperation('product', '=/open_api/v4/clinics/{{$parameter.clinicId}}/products'),
			createUpdateOperation('product', '=/open_api/v4/products/{{$parameter.productId}}'),
			createDeleteOperation('product', '=/open_api/v4/products/{{$parameter.productId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForProduct,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Product',
		name: 'productId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get', 'update', 'delete'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the product',
	},
	...createPaginationParameters('product'),
	...productCreateDescription,
	...productUpdateDescription,
];
