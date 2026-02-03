import { createListSearch } from '../shared/listSearchFactory';
import type { Invoice } from '../shared/types';

export const getInvoices = createListSearch<Invoice>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		const patientId = context.getNodeParameter('patientId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/invoices?patient=${patientId}`;
	},
	requiresClinicId: true,
	nameFormatter: (invoice) => {
		const date = invoice.created_time ? new Date(invoice.created_time).toLocaleDateString() : '';
		const number = invoice.number_id || 'No Number';
		const title = invoice.title ? ` - ${invoice.title}` : '';
		return `${number} (${date})${title}`;
	},
});
