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
import { accountingDistributionCreateDescription } from './create';

const showOnlyForAccountingDistribution = {
	resource: ['accountingDistribution'],
};

export const accountingDistributionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForAccountingDistribution },
		options: [
			createGetManyOperation('accountingDistribution', 'accounting distributions', '=/open_api/v4/clinics/{{$parameter.clinicId}}/accounting_distributions'),
			createGetOperation('accountingDistribution', 'accounting distribution', '=/open_api/v4/accounting_distributions/{{$parameter.accountingDistributionId}}'),
			createCreateOperation('accounting distribution', '=/open_api/v4/clinics/{{$parameter.clinicId}}/accounting_distributions'),
			createUpdateOperation('accounting distribution', '=/open_api/v4/accounting_distributions/{{$parameter.accountingDistributionId}}'),
			createDeleteOperation('accounting distribution', '=/open_api/v4/accounting_distributions/{{$parameter.accountingDistributionId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForAccountingDistribution,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Accounting Distribution',
		name: 'accountingDistributionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['accountingDistribution'],
				operation: ['get', 'update', 'delete'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the accounting distribution',
	},
	{
		displayName: 'Name',
		name: 'accountingDistributionName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['accountingDistribution'], operation: ['update'] } },
		description: 'Display name',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Model (JSON)',
		name: 'accountingDistributionModel',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: { show: { resource: ['accountingDistribution'], operation: ['update'] } },
		description: 'Two distribution lines as JSON array',
		routing: { send: { type: 'body', property: 'model' } },
	},
	...createPaginationParameters('accountingDistribution'),
	...accountingDistributionCreateDescription,
];
