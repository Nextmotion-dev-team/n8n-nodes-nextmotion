import type { INodeProperties } from 'n8n-workflow';
import { clinicSelect, createGetManyOperation, createCreateOperation, createPaginationParameters } from '../../shared/descriptions';
import { communicationRecordCreateDescription } from './create';

const showOnlyForCommunicationRecord = {
	resource: ['communicationRecord'],
};

export const communicationRecordDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCommunicationRecord,
		},
		options: [
			createGetManyOperation(
				'communicationRecord',
				'communication records',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/communication_records',
			),
			createCreateOperation(
				'communicationRecord',
				'=/open_api/v4/clinics/{{$parameter.clinicId}}/communication_records',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		displayOptions: {
			show: showOnlyForCommunicationRecord,
		},
	},
	...createPaginationParameters('communicationRecord'),
	...communicationRecordCreateDescription,
];
