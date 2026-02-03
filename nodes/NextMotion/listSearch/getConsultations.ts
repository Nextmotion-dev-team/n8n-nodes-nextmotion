import { createListSearch } from '../shared/listSearchFactory';
import type { Consultation } from '../shared/types';

export const getConsultations = createListSearch<Consultation>({
	url: (context) => {
		const patientId = context.getNodeParameter('patientId', '', { extractValue: true }) as string;
		return `/open_api/v4/patients/${patientId}/consultations`;
	},
	requiresClinicId: false,
	nameFormatter: (consultation) => {
		const date = consultation.created_time ? new Date(consultation.created_time).toLocaleDateString() : '';
		return consultation.name || `Consultation ${date}` || `Consultation ${consultation.id.slice(0, 8)}`;
	},
	filterMatcher: (consultation, filter) => {
		const searchText = `${consultation.name}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
