import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
} from '../../shared/descriptions';

const showOnlyForVisitTypeCategory = {
	resource: ['visitTypeCategory'],
};

export const visitTypeCategoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForVisitTypeCategory },
		options: [
			createGetManyOperation('visitTypeCategory', 'visit type categories', '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_type_categories'),
			createGetOperation('visitTypeCategory', 'visit type category', '=/open_api/v4/visit_type_categories/{{$parameter.visitTypeCategoryId}}'),
			createCreateOperation('visit type category', '=/open_api/v4/clinics/{{$parameter.clinicId}}/visit_type_categories'),
			createUpdateOperation('visit type category', '=/open_api/v4/visit_type_categories/{{$parameter.visitTypeCategoryId}}'),
			createDeleteOperation('visit type category', '=/open_api/v4/visit_type_categories/{{$parameter.visitTypeCategoryId}}'),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForVisitTypeCategory,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Visit Type Category',
		name: 'visitTypeCategoryId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['visitTypeCategory'],
				operation: ['get', 'update', 'delete'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the visit type category',
	},
	{
		displayName: 'Name',
		name: 'visitTypeCategoryName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['visitTypeCategory'],
				operation: ['create', 'update'],
			},
		},
		description: 'Display name of the visit type category',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['visitTypeCategory'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Speciality',
				name: 'speciality',
				type: 'options',
				options: [
					{ name: 'Aesthetic Doctor', value: 'aesthetic_doctor' },
					{ name: 'Anesthesiologist', value: 'anesthesiologist' },
					{ name: 'Assistant', value: 'assistant' },
					{ name: 'Beautician', value: 'beautician' },
					{ name: 'Clinic Manager', value: 'clinic_manager' },
					{ name: 'Clinic Owner', value: 'clinic_owner' },
					{ name: 'Clinic Team Member', value: 'clinic_team_member' },
					{ name: 'Dental Surgeon', value: 'dental_surgeon' },
					{ name: 'Dermatologist', value: 'dermatologist' },
					{ name: 'Dietician', value: 'dietician' },
					{ name: 'Injecting Nurse', value: 'injecting_nurse' },
					{ name: 'Other', value: 'other_surgeon' },
					{ name: 'Plastic Surgeon', value: 'plastic_surgeon' },
				],
				default: 'aesthetic_doctor',
				routing: { send: { type: 'body', property: 'speciality' } },
			},
		],
	},
	...createPaginationParameters('visitTypeCategory'),
];
