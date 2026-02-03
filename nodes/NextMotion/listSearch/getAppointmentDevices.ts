import { createListSearch } from '../shared/listSearchFactory';
import type { AppointmentDevice } from '../shared/types';

export const getAppointmentDevices = createListSearch<AppointmentDevice>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/appointment_devices`;
	},
	requiresClinicId: true,
	nameFormatter: (device) => {
		return device.name || `Device ${device.id}`;
	},
});
