import { createListSearch } from '../shared/listSearchFactory';
import type { Patient } from '../shared/types';

export const getPatients = createListSearch<Patient>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/patients`;
	},
	requiresClinicId: true,
	filterField: 'search',
	nameFormatter: (patient) => `${patient.first_name} ${patient.last_name} (${patient.email})`,
});
