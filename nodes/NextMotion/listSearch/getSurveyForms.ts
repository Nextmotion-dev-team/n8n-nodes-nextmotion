import { createListSearch } from '../shared/listSearchFactory';
import type { SurveyForm } from '../shared/types';

export const getSurveyForms = createListSearch<SurveyForm>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/survey_forms`;
	},
	requiresClinicId: true,
	nameFormatter: (surveyForm) => `${surveyForm.name} (${surveyForm.type})`,
});
