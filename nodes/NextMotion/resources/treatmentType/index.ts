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
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';
import { treatmentTypeCreateDescription } from './create';
import { treatmentTypeUpdateDescription } from './update';

const showOnlyForTreatmentType = {
	resource: ['treatmentType'],
};

export const treatmentTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTreatmentType },
		options: [
			createGetManyOperation('treatmentType', 'treatment types', '=/open_api/v4/clinics/{{$parameter.clinicId}}/treatment_types'),
			createGetOperation('treatmentType', 'treatment type', '=/open_api/v4/treatment_types/{{$parameter.treatmentTypeId}}'),
			createCreateOperation('treatment type', '=/open_api/v4/clinics/{{$parameter.clinicId}}/treatment_types'),
			createUpdateOperation('treatment type', '=/open_api/v4/treatment_types/{{$parameter.treatmentTypeId}}'),
			createDeleteOperation('treatment type', '=/open_api/v4/treatment_types/{{$parameter.treatmentTypeId}}'),
			{
				name: 'Get Post Treatment Config',
				value: 'getPostTreatmentConfig',
				action: 'Get post treatment config',
				description: 'Retrieve the post-treatment config for a treatment type',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/treatment_types/{{$parameter.treatmentTypeId}}/post_treatment_config',
					},
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
			{
				name: 'Update Post Treatment Config',
				value: 'updatePostTreatmentConfig',
				action: 'Update post treatment config',
				description: 'Update the post-treatment config for a treatment type',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open_api/v4/treatment_types/{{$parameter.treatmentTypeId}}/post_treatment_config',
					},
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
		],
		default: 'getPostTreatmentConfig',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForTreatmentType,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Treatment Type',
		name: 'treatmentTypeId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['treatmentType'],
				operation: ['get', 'update', 'delete', 'getPostTreatmentConfig', 'updatePostTreatmentConfig'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getTreatmentTypes', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The treatment type to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('treatmentType'),
	{
		displayName: 'Update Fields',
		name: 'postTreatmentConfigFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForTreatmentType,
				operation: ['updatePostTreatmentConfig'],
			},
		},
		options: [
			{
				displayName: 'Deal Lost After (Seconds)',
				name: 'deal_lost_after_seconds',
				type: 'number',
				default: 0,
				typeOptions: { minValue: 0 },
				description: 'Seconds after which the deal is considered lost if no response',
				routing: { send: { type: 'body', property: 'deal_lost_after_seconds' } },
			},
			{
				displayName: 'Post Follow-Up Email (JSON)',
				name: 'post_follow_up_email',
				type: 'json',
				default: '{}',
				description: 'Post-treatment follow-up email configuration (survey_form, pdf_attachment, delay_seconds, is_enabled)',
				routing: { send: { type: 'body', property: 'post_follow_up_email' } },
			},
			{
				displayName: 'Reminder Email (JSON)',
				name: 'reminder_email',
				type: 'json',
				default: '{}',
				description: 'Reminder email configuration (survey_form, pdf_attachment, delay_seconds, is_enabled)',
				routing: { send: { type: 'body', property: 'reminder_email' } },
			},
		],
	},
	...treatmentTypeCreateDescription,
	...treatmentTypeUpdateDescription,
];
