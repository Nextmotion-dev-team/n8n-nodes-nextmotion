import type { INodeProperties } from 'n8n-workflow';
import {
	clinicSelect,
	createGetManyOperation,
	createGetOperation,
	createCreateOperation,
	createUpdateOperation,
	createDeleteOperation,
	createPaginationParameters,
	createPostOperation,
} from '../../shared/descriptions';
import { treatmentPackageCreateDescription } from './create';
import { treatmentPackageUpdateDescription } from './update';

const showOnlyForTreatmentPackage = {
	resource: ['treatmentPackage'],
};

export const treatmentPackageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTreatmentPackage },
		options: [
			createGetManyOperation('treatmentPackage', 'treatment packages', '=/open_api/v4/clinics/{{$parameter.clinicId}}/treatment_packages'),
			createGetOperation('treatmentPackage', 'treatment package', '=/open_api/v4/treatment_packages/{{$parameter.treatmentPackageId}}'),
			createCreateOperation('treatment package', '=/open_api/v4/clinics/{{$parameter.clinicId}}/treatment_packages'),
			createUpdateOperation('treatment package', '=/open_api/v4/treatment_packages/{{$parameter.treatmentPackageId}}'),
			createDeleteOperation('treatment package', '=/open_api/v4/treatment_packages/{{$parameter.treatmentPackageId}}'),
			createPostOperation(
				'Extract',
				'extract',
				'Extract a treatment package',
				'Extract treatment package items into individual treatments',
				'=/open_api/v4/treatment_packages/{{$parameter.treatmentPackageId}}/extract',
			),
		],
		default: 'getAll',
	},
	{
		...clinicSelect,
		required: false,
		displayOptions: {
			show: {
				...showOnlyForTreatmentPackage,
				operation: ['getAll', 'create'],
			},
		},
		description: 'Required for Get Many and Create. Optional for other operations.',
	},
	{
		displayName: 'Treatment Package',
		name: 'treatmentPackageId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['treatmentPackage'],
				operation: ['get', 'update', 'delete', 'extract'],
			},
		},
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'The ID of the treatment package',
	},
	...createPaginationParameters('treatmentPackage'),
	...treatmentPackageCreateDescription,
	...treatmentPackageUpdateDescription,
];
