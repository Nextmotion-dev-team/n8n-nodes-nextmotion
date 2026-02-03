import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createGetOperation, createPaginationParameters } from '../../shared/descriptions';
import { appointmentRequestCreateDescription } from './create';

const showOnlyForAppointmentRequest = {
	resource: ['appointmentRequest'],
};

export const appointmentRequestDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAppointmentRequest,
		},
		options: [
			createGetManyOperation(
				'appointmentRequest',
				'appointment requests',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/appointment_requests',
			),
			createGetOperation(
				'appointmentRequest',
				'appointment request',
				'=/open_api/v4/appointment_requests/{{$parameter.appointmentRequestId}}',
			),
			{
				name: 'Create',
				value: 'create',
				action: 'Create an appointment request',
				description: 'Create a new appointment request',
				routing: {
					request: {
						method: 'POST',
						url: '/open_api/v4/appointment_requests',
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
		default: 'create',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: {
				...showOnlyForAppointmentRequest,
				operation: ['getAll', 'create'],
			},
		},
	},
	{
		displayName: 'Appointment Request ID',
		name: 'appointmentRequestId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForAppointmentRequest,
				operation: ['get'],
			},
		},
		description: 'The ID of the appointment request',
	},
	...createPaginationParameters('appointmentRequest'),
	...appointmentRequestCreateDescription,
];
