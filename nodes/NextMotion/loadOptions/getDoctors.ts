import { createLoadOptions } from '../shared/loadOptionsFactory';
import type { Doctor } from '../shared/types';

export const getDoctorsLoadOptions = createLoadOptions<Doctor>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/doctors`;
	},
	requiresClinicId: true,
	nameFormatter: (doctor) => {
		return doctor.prefixed_name || `${doctor.first_name} ${doctor.last_name}`.trim() || `Doctor ${doctor.id}`;
	},
});
