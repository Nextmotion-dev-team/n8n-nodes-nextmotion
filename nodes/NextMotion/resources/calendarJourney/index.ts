import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createPaginationParameters } from '../../shared/descriptions';

const showOnlyForCalendarJourney = {
	resource: ['calendarJourney'],
};

export const calendarJourneyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCalendarJourney,
		},
		options: [
			createGetManyOperation(
				'calendarJourney',
				'calendar journeys',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/calendar_journeys',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForCalendarJourney,
		},
	},
	...createPaginationParameters('calendarJourney'),
];
