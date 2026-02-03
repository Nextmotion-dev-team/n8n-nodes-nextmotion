import { createListSearch } from '../shared/listSearchFactory';
import type { CalendarAppointment } from '../shared/types';

export const getCalendarAppointments = createListSearch<CalendarAppointment>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/calendar_appointments`;
	},
	requiresClinicId: true,
	nameFormatter: (appointment) => {
		const subject = appointment.subject || 'Appointment';
		const patientName = appointment.patient 
			? `${appointment.patient.first_name || ''} ${appointment.patient.last_name || ''}`.trim()
			: '';
		const startTime = appointment.calendar_event?.start_time 
			? new Date(appointment.calendar_event.start_time).toLocaleString() 
			: '';
		
		if (patientName && startTime) {
			return `${subject} - ${patientName} (${startTime})`;
		} else if (patientName) {
			return `${subject} - ${patientName}`;
		} else if (startTime) {
			return `${subject} (${startTime})`;
		}
		return subject;
	},
	filterMatcher: (appointment, filter) => {
		const patientName = appointment.patient 
			? `${appointment.patient.first_name || ''} ${appointment.patient.last_name || ''}`.trim()
			: '';
		const searchText = `${appointment.subject} ${patientName}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
