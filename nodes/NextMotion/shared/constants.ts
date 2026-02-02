export const PAGINATION_DEFAULT_LIMIT = 50;
export const PAGINATION_MAX_LIMIT = 100;
export const PAGINATION_MIN_LIMIT = 1;

export const API_BASE_URL = 'https://api.nextmotion.net';

export const STANDARD_OUTPUT_POST_RECEIVE = [
	{
		type: 'rootProperty' as const,
		properties: {
			property: 'data',
		},
	},
];
