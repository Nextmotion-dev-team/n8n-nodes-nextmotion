import { createListSearch } from '../shared/listSearchFactory';
import type { Doctor } from '../shared/types';

export const getDoctors = createListSearch<Doctor>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/doctors`;
	},
	requiresClinicId: true,
	nameFormatter: (doctor) => doctor.prefixed_name,
	filterMatcher: (doctor, filter) =>
		doctor.prefixed_name.toLowerCase().includes(filter.toLowerCase()),
});
