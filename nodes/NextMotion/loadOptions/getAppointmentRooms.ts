import { createLoadOptions } from '../shared/loadOptionsFactory';
import type { AppointmentRoom } from '../shared/types';

export const getAppointmentRoomsLoadOptions = createLoadOptions<AppointmentRoom>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/appointment_rooms`;
	},
	requiresClinicId: true,
	nameFormatter: (room) => {
		return room.name || `Room ${room.id}`;
	},
});
