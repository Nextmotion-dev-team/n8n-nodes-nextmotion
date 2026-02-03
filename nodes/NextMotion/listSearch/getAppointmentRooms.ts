import { createListSearch } from '../shared/listSearchFactory';
import type { AppointmentRoom } from '../shared/types';

export const getAppointmentRooms = createListSearch<AppointmentRoom>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/appointment_rooms`;
	},
	requiresClinicId: true,
	nameFormatter: (room) => {
		return room.name || `Room ${room.id}`;
	},
});
