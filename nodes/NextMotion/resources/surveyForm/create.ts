import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSurveyFormCreate = {
	operation: ['create'],
	resource: ['surveyForm'],
};

export const surveyFormCreateDescription: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Bolt Note', value: 'bolt_note' },
			{ name: 'Treatment Consent', value: 'treatment_consent' },
		],
		default: 'bolt_note',
		required: true,
		displayOptions: { show: showOnlyForSurveyFormCreate },
		description: 'Kind of survey form template',
		routing: { send: { type: 'body', property: 'type' } },
	},
	{
		displayName: 'Name',
		name: 'surveyFormName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForSurveyFormCreate },
		description: 'Display name',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Fields Template (JSON)',
		name: 'fields_tmpl',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: { show: showOnlyForSurveyFormCreate },
		description: 'Questionnaire fields template as JSON object',
		routing: { send: { type: 'body', property: 'fields_tmpl' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForSurveyFormCreate },
		options: [
			{
				displayName: 'Note Template (JSON)',
				name: 'note_tmpl',
				type: 'json',
				default: '{}',
				description: 'Template for the note/document body as JSON object',
				routing: { send: { type: 'body', property: 'note_tmpl' } },
			},
		],
	},
];
