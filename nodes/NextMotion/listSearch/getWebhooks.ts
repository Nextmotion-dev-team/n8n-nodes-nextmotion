import { createListSearch } from '../shared/listSearchFactory';
import type { Webhook } from '../shared/types';

export const getWebhooks = createListSearch<Webhook>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/webhooks`;
	},
	requiresClinicId: true,
	nameFormatter: (webhook) => {
		const event = webhook.action_type || 'unknown';
		const url = webhook.url || '';
		const urlShort = url.length > 40 ? `${url.substring(0, 37)}...` : url;
		return `${event} → ${urlShort}`;
	},
	filterMatcher: (webhook, filter) => {
		const searchText = `${webhook.action_type} ${webhook.url}`.toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});
