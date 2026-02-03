import { createListSearch } from '../shared/listSearchFactory';
import type { Lead } from '../shared/types';

export const getLeads = createListSearch<Lead>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/leads`;
	},
	requiresClinicId: true,
	nameFormatter: (lead) => {
		const name = `${lead.first_name} ${lead.last_name}`.trim() || 'Unnamed Lead';
		const email = lead.email ? ` (${lead.email})` : '';
		const status = lead.is_done ? ' [Converted]' : '';
		return `${name}${email}${status}`;
	},
	filterMatcher: (lead, filter) => {
		const searchText = `${lead.first_name} ${lead.last_name} ${lead.email}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
