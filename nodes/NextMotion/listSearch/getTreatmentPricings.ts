import { createListSearch } from '../shared/listSearchFactory';
import type { TreatmentPricing } from '../shared/types';

export const getTreatmentPricings = createListSearch<TreatmentPricing>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/treatment_pricings`;
	},
	requiresClinicId: true,
	nameFormatter: (pricing) => {
		const price = pricing.price ? `${pricing.price}` : '0';
		const sessions = pricing.sessions ? ` (${pricing.sessions} sessions)` : '';
		const details = pricing.details ? ` - ${pricing.details}` : '';
		return `${price}${sessions}${details}`;
	},
	filterMatcher: (pricing, filter) => {
		const searchText = `${pricing.price} ${pricing.details}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
