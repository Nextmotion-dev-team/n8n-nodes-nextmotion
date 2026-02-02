import type { INodeProperties } from 'n8n-workflow';
import { createPaginationParameters } from '../../shared/descriptions';

const showOnlyForClinic = {
	resource: ['clinic'],
};

export const clinicDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForClinic,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many clinics',
				description: 'Get a list of all clinics',
				routing: {
					request: {
						method: 'GET',
						url: '/open_api/v4/clinics',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
	...createPaginationParameters('clinic'),
];
