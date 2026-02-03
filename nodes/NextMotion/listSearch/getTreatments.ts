import { createListSearch } from '../shared/listSearchFactory';
import type { Treatment } from '../shared/types';

export const getTreatments = createListSearch<Treatment>({
	url: (context) => {
		const patientId = context.getNodeParameter('patientId', '', { extractValue: true }) as string;
		
		// Try to get consultation ID if it exists (used in filters or create operations)
		let consultationId: string | undefined;
		try {
			consultationId = context.getNodeParameter('consultationId', '', { extractValue: true }) as string;
		} catch {
			// consultationId doesn't exist for some operations, that's ok
		}
		
		let url = `/open_api/v4/patients/${patientId}/treatments`;
		if (consultationId) {
			url += `?consultation=${consultationId}`;
		}
		return url;
	},
	requiresClinicId: false,
	nameFormatter: (treatment) => {
		const typeName = treatment.treatment_type ? ` (${treatment.treatment_type})` : '';
		const text = treatment.text || treatment.notes || 'Unnamed Treatment';
		return `${text}${typeName}`.trim();
	},
	filterMatcher: (treatment, filter) => {
		const searchText = `${treatment.text} ${treatment.notes}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
