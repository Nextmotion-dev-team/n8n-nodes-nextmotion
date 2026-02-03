import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createGetOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForSurveyForm = {
	resource: ['surveyForm'],
};

export const surveyFormDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSurveyForm,
		},
		options: [
			createGetManyOperation(
				'surveyForm',
				'survey forms',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/survey_forms',
			),
			createGetOperation(
				'surveyForm',
				'survey form',
				'=/open_api/v4/survey_forms/{{$parameter.surveyFormId}}',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForSurveyForm,
				operation: ['getAll', 'get'],
			},
		},
		description: 'Required for Get Many. Optional for Get when using survey form ID directly.',
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
				operation: ['get'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getSurveyForms',
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
		description: 'The survey form to get (select clinic first for dropdown)',
	},
	...createPaginationParameters('surveyForm'),
];
