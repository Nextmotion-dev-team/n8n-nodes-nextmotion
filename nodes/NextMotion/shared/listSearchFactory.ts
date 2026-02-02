import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
} from 'n8n-workflow';
import { nextMotionApiRequest } from './transport';
import type { PaginatedResponse } from './types';
import { PAGINATION_DEFAULT_LIMIT } from './constants';

interface ListSearchConfig<T> {
	url: string | ((context: ILoadOptionsFunctions) => string);
	requiresClinicId?: boolean;
	filterField?: 'search' | 'name';
	nameFormatter: (item: T) => string;
	filterMatcher?: (item: T, filter: string) => boolean;
	supportsPagination?: boolean;
}

export function createListSearch<T extends { id: string; name?: string }>(
	config: ListSearchConfig<T>,
) {
	return async function (
		this: ILoadOptionsFunctions,
		filter?: string,
		paginationToken?: string,
	): Promise<INodeListSearchResult> {
		// Handle clinic dependency
		if (config.requiresClinicId) {
			const clinicId = this.getNodeParameter('clinicId', '', { extractValue: true }) as string;
			if (!clinicId) {
				return { results: [] };
			}
		}

		// Setup pagination
		const supportsPagination = config.supportsPagination !== false;
		const offset = supportsPagination && paginationToken ? parseInt(paginationToken) : 0;
		const limit = PAGINATION_DEFAULT_LIMIT;

		// Build URL
		const url = typeof config.url === 'function' ? config.url(this) : config.url;

		// Build query string
		const qs: Record<string, string | number> = {};
		if (supportsPagination) {
			qs.limit = limit;
			qs.offset = offset;
		}
		if (filter && config.filterField === 'search') {
			qs.search = filter;
		}

		// Make API request
		const responseData = (await nextMotionApiRequest.call(
			this,
			'GET',
			url,
			qs,
		)) as PaginatedResponse<T>;

		// Filter and map results
		let items = responseData.data;
		
		if (filter && config.filterField !== 'search') {
			const matcher = config.filterMatcher || ((item: T, f: string) => {
				const name = item.name || '';
				return name.toLowerCase().includes(f.toLowerCase());
			});
			items = items.filter((item) => matcher(item, filter));
		}

		const results: INodeListSearchItems[] = items.map((item) => ({
			name: config.nameFormatter(item),
			value: item.id,
		}));

		// Handle pagination token
		const nextPaginationToken =
			supportsPagination && responseData.next ? String(offset + limit) : undefined;

		return { results, paginationToken: nextPaginationToken };
	};
}
