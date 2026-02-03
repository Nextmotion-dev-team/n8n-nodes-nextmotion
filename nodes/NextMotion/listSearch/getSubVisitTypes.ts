import { createListSearch } from '../shared/listSearchFactory';
import type { SubVisitType } from '../shared/types';

export const getSubVisitTypes = createListSearch<SubVisitType>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		const visitTypeId = context.getNodeParameter('updateFields.visit_type', '', { extractValue: true }) as string;
		
		let url = `/open_api/v4/clinics/${clinicId}/sub_visit_types`;
		if (visitTypeId) {
			url += `?visit_type=${visitTypeId}`;
		}
		return url;
	},
	requiresClinicId: true,
	nameFormatter: (subVisitType) => {
		return subVisitType.subject || `Sub Visit Type ${subVisitType.id}`;
	},
});
