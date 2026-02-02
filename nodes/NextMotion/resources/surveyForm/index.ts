import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createGetOperation, createPaginationParameters, createIdField } from '../../shared/descriptions';

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
		displayOptions: {
			show: {
				...showOnlyForSurveyForm,
				operation: ['getAll'],
			},
		},
	},
	createIdField('Survey Form ID', 'surveyFormId', 'surveyForm', ['get']),
	...createPaginationParameters('surveyForm'),
];
