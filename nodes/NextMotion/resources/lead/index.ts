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
	createIdField,
} from '../../shared/descriptions';
import { leadFiltersDescription } from './filters';

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
		displayOptions: {
			show: {
				...showOnlyForLead,
				operation: ['getAll', 'create'],
			},
		},
	},
	...createPaginationParameters('lead'),
	createIdField('Lead ID', 'leadId', 'lead', ['get', 'update', 'delete', 'convertToPatient']),
	...leadFiltersDescription,
];
