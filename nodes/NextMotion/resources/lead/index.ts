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
import { leadCreateDescription } from './create';
import { leadFiltersDescription } from './filters';
import { leadUpdateDescription } from './update';

const showOnlyForLead = {
	resource: ['lead'],
};

export const leadDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLead,
		},
		options: [
			createGetManyOperation(
				'lead',
				'leads',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/leads',
			),
			createGetOperation(
				'lead',
				'lead',
				'=/open_api/v4/leads/{{$parameter.leadId}}',
			),
			createCreateOperation(
				'lead',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/leads',
			),
			createUpdateOperation(
				'lead',
				'=/open_api/v4/leads/{{$parameter.leadId}}',
			),
			createDeleteOperation(
				'lead',
				'=/open_api/v4/leads/{{$parameter.leadId}}',
			),
			createPostOperation(
				'Convert to Patient',
				'convertToPatient',
				'Convert lead to patient',
				'Convert a lead into a patient',
				'=/open_api/v4/leads/{{$parameter.leadId}}/convert_to_patient',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForLead,
				operation: ['getAll', 'create', 'get', 'update', 'delete', 'convertToPatient'],
			},
		},
		description: 'Required for Get Many and Create. Optional for Get/Update/Delete/Convert when using lead ID directly.',
	},
	{
		displayName: 'Lead',
		name: 'leadId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get', 'update', 'delete', 'convertToPatient'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getLeads',
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
		description: 'The lead to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('lead'),
	...leadCreateDescription,
	...leadFiltersDescription,
	...leadUpdateDescription,
];
