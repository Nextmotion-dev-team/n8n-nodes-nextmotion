import type { INodeProperties } from 'n8n-workflow';
import { STANDARD_OUTPUT_POST_RECEIVE } from '../../shared/constants';

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['user'] } },
		options: [
			{
				name: 'Get Me',
				value: 'getMe',
				action: 'Get current user',
				description: 'Get the data of the currently authenticated user',
				routing: {
					request: { method: 'GET', url: '/open_api/v4/users/me' },
					output: { postReceive: STANDARD_OUTPUT_POST_RECEIVE },
				},
			},
		],
		default: 'getMe',
	},
];
