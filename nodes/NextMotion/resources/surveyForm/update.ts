import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSurveyFormUpdate = {
	operation: ['update'],
	resource: ['surveyForm'],
};

export const surveyFormUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForSurveyFormUpdate },
		options: [
			{
				displayName: 'Fields Template (JSON)',
				name: 'fields_tmpl',
				type: 'json',
				default: '{}',
				description: 'Questionnaire fields template as JSON object',
				routing: { send: { type: 'body', property: 'fields_tmpl' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Note Template (JSON)',
				name: 'note_tmpl',
				type: 'json',
				default: '{}',
				routing: { send: { type: 'body', property: 'note_tmpl' } },
			},
		],
	},
];
