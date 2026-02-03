import { createListSearch } from '../shared/listSearchFactory';
import type { Prescription } from '../shared/types';

export const getPrescriptions = createListSearch<Prescription>({
	url: (context) => {
		const patientId = context.getNodeParameter('patientId', '', { extractValue: true }) as string;
		return `/open_api/v4/patients/${patientId}/prescriptions`;
	},
	requiresClinicId: false,
	nameFormatter: (prescription) => {
		const date = prescription.created_time ? new Date(prescription.created_time).toLocaleDateString() : '';
		const patientName = prescription.patient 
			? `${prescription.patient.first_name || ''} ${prescription.patient.last_name || ''}`.trim()
			: '';
		return `${prescription.title}${patientName ? ` - ${patientName}` : ''}${date ? ` (${date})` : ''}`;
	},
	filterMatcher: (prescription, filter) => {
		const patientName = prescription.patient 
			? `${prescription.patient.first_name || ''} ${prescription.patient.last_name || ''}`.trim()
			: '';
		const searchText = `${prescription.title} ${patientName}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
