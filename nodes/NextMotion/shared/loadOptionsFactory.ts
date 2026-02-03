import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { nextMotionApiRequest } from './transport';
import type { PaginatedResponse } from './types';

interface LoadOptionsConfig<T> {
	url: string | ((context: ILoadOptionsFunctions) => string);
	requiresClinicId?: boolean;
	nameFormatter: (item: T) => string;
	valueFormatter?: (item: T) => string;
}

export function createLoadOptions<T extends { id: string; name?: string }>(
	config: LoadOptionsConfig<T>,
) {
	return async function (this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		// Handle clinic dependency
		if (config.requiresClinicId) {
			const clinicId = this.getNodeParameter('clinicId', '', { extractValue: true }) as string;
			if (!clinicId) {
				return [];
			}
		}

		// Build URL
		const url = typeof config.url === 'function' ? config.url(this) : config.url;

		try {
			// Make API request
			const response = await nextMotionApiRequest.call(
				this,
				'GET',
				url,
			) as PaginatedResponse<T>;

			// Format results
			const items = response.data || [];
			return items.map((item) => ({
				name: config.nameFormatter(item),
				value: config.valueFormatter ? config.valueFormatter(item) : item.id,
			}));
		} catch {
			return [];
		}
	};
}
