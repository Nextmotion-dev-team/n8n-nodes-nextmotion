import { createListSearch } from '../shared/listSearchFactory';
import type { Quote } from '../shared/types';

export const getQuotes = createListSearch<Quote>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		const patientId = context.getNodeParameter('patientId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/quotes?patient=${patientId}`;
	},
	requiresClinicId: true,
	nameFormatter: (quote) => {
		const date = quote.created_time ? new Date(quote.created_time).toLocaleDateString() : '';
		const number = quote.number_id || 'No Number';
		const title = quote.title ? ` - ${quote.title}` : '';
		return `${number} (${date})${title}`;
	},
});
