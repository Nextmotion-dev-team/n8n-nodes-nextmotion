import type { IDataObject, IHookFunctions } from 'n8n-workflow';
import { nextMotionApiRequest } from './transport';

/**
 * Generate a cryptographically secure webhook secret
 * Format: whsec_<random_string> (similar to Stripe/GitHub)
 */
export function generateWebhookSecret(): string {
	// Combine multiple random sources for sufficient entropy (~208 bits)
	const randomString = Array.from({ length: 4 }, () => 
		Math.random().toString(36).substring(2, 15)
	).join('');
	return `whsec_${randomString}`;
}

/**
 * Shared helper to create a webhook registration payload
 */
export function buildWebhookPayload(
	eventType: string,
	webhookUrl: string,
	options: {
		headers?: Record<string, string>;
		isThirdParty?: boolean;
	} = {},
): IDataObject {
	const payload: IDataObject = {
		action_type: eventType,
		url: webhookUrl,
	};

	// Add is_third_party flag (for n8n integration)
	if (options.isThirdParty !== undefined) {
		payload.is_third_party = options.isThirdParty;
	}

	// Add custom headers if provided
	if (options.headers && Object.keys(options.headers).length > 0) {
		payload.headers = options.headers;
	}

	return payload;
}

/**
 * Register a webhook with NextMotion API
 */
export async function registerWebhook(
	context: IHookFunctions,
	clinicId: string,
	eventType: string,
	webhookUrl: string,
	options: {
		headers?: Record<string, string>;
		isThirdParty?: boolean;
	} = {},
): Promise<{ id: string; [key: string]: unknown }> {
	const payload = buildWebhookPayload(eventType, webhookUrl, options);

	const response = await nextMotionApiRequest.call(
		context,
		'POST',
		`/open_api/v4/clinics/${clinicId}/webhooks`,
		{},
		payload,
	);

	return response.data;
}

/**
 * Delete a webhook from NextMotion API
 */
export async function deleteWebhook(
	context: IHookFunctions,
	webhookId: string,
): Promise<boolean> {
	try {
		await nextMotionApiRequest.call(context, 'DELETE', `/open_api/v4/webhooks/${webhookId}`);
		return true;
	} catch {
		// Webhook might already be deleted
		return false;
	}
}

/**
 * Event type options for webhook configuration
 * Alphabetically sorted for consistency across the node
 */
export const WEBHOOK_EVENT_OPTIONS = [
	{ name: 'Appointment Absence Intersect', value: 'calendar_appointment_absence_intersect' },
	{ name: 'Appointment Created', value: 'calendar_appointment_create' },
	{ name: 'Appointment Deleted', value: 'calendar_appointment_delete' },
	{ name: 'Appointment Ended', value: 'calendar_appointment_end' },
	{ name: 'Appointment Request Created', value: 'appointment_request_create' },
	{ name: 'Appointment Started', value: 'calendar_appointment_start' },
	{ name: 'Appointment Updated', value: 'calendar_appointment_update' },
	{ name: 'Invoice Created', value: 'invoice_create' },
	{ name: 'Invoice Paid', value: 'invoice_paid' },
	{ name: 'Invoice Validated', value: 'invoice_validate' },
	{ name: 'Lead Created', value: 'lead_create' },
	{ name: 'Next Visit Reminder', value: 'calendar_appointment_next_visit_remind' },
	{ name: 'Patient Created', value: 'patient_create' },
	{ name: 'Patient Deleted', value: 'patient_delete' },
	{ name: 'Patient Updated', value: 'patient_update' },
	{ name: 'Payment Created', value: 'payment_create' },
	{ name: 'Quote Accepted', value: 'quote_accept' },
	{ name: 'Quote Created', value: 'quote_create' },
	{ name: 'Quote Validated', value: 'quote_validate' },
	{ name: 'Review Request Sent', value: 'review_request_send' },
	{ name: 'Treatment Reminder', value: 'treatment_remind' },
	{ name: 'Visit Audio Attached', value: 'visit_audio_attach' },
	{ name: 'Visit Created', value: 'visit_create' },
];
