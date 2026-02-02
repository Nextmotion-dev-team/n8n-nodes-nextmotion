import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {
			// Disable rules that don't work with factory functions
			'n8n-nodes-base/node-param-operation-option-action-miscased': 'off',
			'n8n-nodes-base/node-param-operation-option-action-wrong-for-get-many': 'off',
			'n8n-nodes-base/node-param-operation-option-without-action': 'off',
			'n8n-nodes-base/node-param-operation-option-action-wrong-for-get-all': 'off',
			'n8n-nodes-base/node-param-operation-option-description-wrong-for-get-many': 'off',
			'n8n-nodes-base/node-param-operation-option-description-wrong-for-get-all': 'off',
		},
	},
];
