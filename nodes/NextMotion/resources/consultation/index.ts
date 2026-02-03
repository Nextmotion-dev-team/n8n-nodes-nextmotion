import type { INodeProperties } from 'n8n-workflow';
import { patientSelect, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForConsultation = {
	resource: ['consultation'],
};

export const consultationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForConsultation,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many consultations',
				description: 'Get a list of consultations for a patient',
				routing: {
					request: {
						method: 'GET',
						url: '=/open_api/v4/patients/{{$parameter.patientId}}/consultations',
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
	{
		...patientSelect,
		displayOptions: {
			show: showOnlyForConsultation,
		},
	},
	...createPaginationParameters('consultation'),
];
