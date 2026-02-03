import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUploadConsentForm = {
	operation: ['uploadConsentForm'],
	resource: ['treatment'],
};

export const treatmentUploadConsentFormDescription: INodeProperties[] = [
	{
		displayName: 'Document',
		name: 'document',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: showOnlyForUploadConsentForm,
		},
		placeholder: 'Enter binary property name from previous node',
		description: 'Name of the binary property containing the consent form PDF to upload (e.g., "data" from Read Binary File node)',
		routing: {
			request: {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			send: {
				preSend: [
					async function (this, requestOptions) {
						const itemIndex = 0;
						const binaryPropertyName = this.getNodeParameter('document', itemIndex) as string;
						const binaryData = this.helpers.assertBinaryData(binaryPropertyName, itemIndex);
						const dataBuffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName, itemIndex);

						// Set formData for multipart upload
						Object.assign(requestOptions, {
							formData: {
								document: {
									value: dataBuffer,
									options: {
										filename: binaryData.fileName || 'consent_form.pdf',
										contentType: binaryData.mimeType || 'application/pdf',
									},
								},
							},
						});

						return requestOptions;
					},
				],
			},
		},
	},
];
