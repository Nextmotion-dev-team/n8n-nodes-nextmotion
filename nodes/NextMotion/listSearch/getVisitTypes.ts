import { createListSearch } from '../shared/listSearchFactory';
import type { VisitType } from '../shared/types';

export const getVisitTypes = createListSearch<VisitType>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/visit_types`;
	},
	requiresClinicId: true,
	nameFormatter: (visitType) => visitType.subject,
});
