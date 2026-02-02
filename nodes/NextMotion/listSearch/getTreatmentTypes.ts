import { createListSearch } from '../shared/listSearchFactory';
import type { TreatmentType } from '../shared/types';

export const getTreatmentTypes = createListSearch<TreatmentType>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/treatment_types`;
	},
	requiresClinicId: true,
	nameFormatter: (treatmentType) => treatmentType.name,
});
