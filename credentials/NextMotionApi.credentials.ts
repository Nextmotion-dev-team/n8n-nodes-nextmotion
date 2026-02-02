import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NextMotionApi implements ICredentialType {
	name = 'nextMotionApi';

	displayName = 'NextMotion API';

	icon: Icon = 'file:../icons/nextmotion.svg';

	documentationUrl = 'https://api.nextmotion.net/open_api/docs/redoc';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API key generated from NextMotion Settings > API Keys.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.nextmotion.net',
			url: '/open_api/v4/users/me',
			method: 'GET',
		},
	};
}
