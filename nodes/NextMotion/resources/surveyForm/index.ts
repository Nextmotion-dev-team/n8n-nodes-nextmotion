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
import { surveyFormCreateDescription } from './create';
import { surveyFormUpdateDescription } from './update';

const showOnlyForSurveyForm = {
	resource: ['surveyForm'],
};

export const surveyFormDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSurveyForm },
		options: [
			createGetManyOperation('surveyForm', 'survey forms', '=/open_api/v4/clinics/{{$parameter.clinicId}}/survey_forms'),
			createGetOperation('surveyForm', 'survey form', '=/open_api/v4/survey_forms/{{$parameter.surveyFormId}}'),
			createCreateOperation('survey form', '=/open_api/v4/clinics/{{$parameter.clinicId}}/survey_forms'),
			createUpdateOperation('survey form', '=/open_api/v4/survey_forms/{{$parameter.surveyFormId}}'),
			createDeleteOperation('survey form', '=/open_api/v4/survey_forms/{{$parameter.surveyFormId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForSurveyForm,
				operation: ['getAll', 'get', 'create', 'update', 'delete'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Survey Form',
		name: 'surveyFormId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['surveyForm'],
				operation: ['get', 'update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: { searchListMethod: 'getSurveyForms', searchable: true },
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
			},
		],
		description: 'The survey form to operate on (select clinic first for dropdown)',
	},
	...createPaginationParameters('surveyForm'),
	...surveyFormCreateDescription,
	...surveyFormUpdateDescription,
];
