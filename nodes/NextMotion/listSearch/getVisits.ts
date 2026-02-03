import { createListSearch } from '../shared/listSearchFactory';
import type { Visit } from '../shared/types';

export const getVisits = createListSearch<Visit>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/visits`;
	},
	requiresClinicId: true,
	nameFormatter: (visit) => {
		const subject = visit.subject || 'Visit';
		const date = visit.visit_time ? new Date(visit.visit_time).toLocaleDateString() : '';
		return date ? `${subject} (${date})` : subject;
	},
	filterMatcher: (visit, filter) => {
		const searchText = `${visit.subject} ${visit.note || ''}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
