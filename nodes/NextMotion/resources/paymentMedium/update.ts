import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPaymentMediumUpdate = {
	operation: ['update'],
	resource: ['paymentMedium'],
};

export const paymentMediumUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'paymentMediumName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForPaymentMediumUpdate },
		description: 'Custom payment medium label',
		routing: { send: { type: 'body', property: 'name' } },
	},
];
