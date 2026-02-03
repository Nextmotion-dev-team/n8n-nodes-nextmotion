import { createListSearch } from '../shared/listSearchFactory';
import type { Payment } from '../shared/types';

export const getPayments = createListSearch<Payment>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/payments`;
	},
	requiresClinicId: true,
	nameFormatter: (payment) => {
		const date = payment.created_time ? new Date(payment.created_time).toLocaleDateString() : '';
		
		// Calculate total amount from all payment methods
		const amounts = [
			parseFloat(payment.cash || '0'),
			parseFloat(payment.card || '0'),
			parseFloat(payment.check || '0'),
			parseFloat(payment.transfer || '0'),
			parseFloat(payment.other || '0'),
		];
		const total = amounts.reduce((sum, amt) => sum + amt, 0);
		const totalStr = total > 0 ? total.toFixed(2) : '0.00';
		
		// Determine primary payment method
		const methods = [];
		if (parseFloat(payment.cash || '0') > 0) methods.push('Cash');
		if (parseFloat(payment.card || '0') > 0) methods.push('Card');
		if (parseFloat(payment.check || '0') > 0) methods.push('Check');
		if (parseFloat(payment.transfer || '0') > 0) methods.push('Transfer');
		if (parseFloat(payment.other || '0') > 0) methods.push('Other');
		
		const methodStr = methods.length > 0 ? methods.join(', ') : 'Payment';
		
		return `${totalStr} (${methodStr}) - ${date}`;
	},
});
