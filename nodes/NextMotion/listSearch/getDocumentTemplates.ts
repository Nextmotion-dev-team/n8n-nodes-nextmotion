import { createListSearch } from '../shared/listSearchFactory';
import type { DocumentTemplate } from '../shared/types';

// Document Type Enum from API:
// 0 - PRESCRIPTION
// 1 - QUOTE
// 2 - INVOICE
// 3 - DEPOSIT_INVOICE
// 4 - CREDIT_NOTE
// 6 - IMAGE_RIGHTS_CONSENT
// 7 - ADMINISTRATIVE
// 8 - VISIT

export const getDocumentTemplates = createListSearch<DocumentTemplate>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		const type = context.getNodeParameter('documentTemplateType', 0, { extractValue: true }) as number;
		return `/open_api/v4/clinics/${clinicId}/document_templates?type=${type}`;
	},
	requiresClinicId: true,
	nameFormatter: (template) => template.name || `Template ${template.id.slice(0, 8)}`,
	filterMatcher: (template, filter) => {
		const searchText = (template.name || '').toLowerCase();
		return searchText.includes(filter.toLowerCase());
	},
});

export const getInvoiceDocumentTemplates = createListSearch<DocumentTemplate>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/document_templates?type=2`;
	},
	requiresClinicId: true,
	nameFormatter: (template) => template.name || `Template ${template.id.slice(0, 8)}`,
});

export const getQuoteDocumentTemplates = createListSearch<DocumentTemplate>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/document_templates?type=1`;
	},
	requiresClinicId: true,
	nameFormatter: (template) => template.name || `Template ${template.id.slice(0, 8)}`,
});

export const getPrescriptionDocumentTemplates = createListSearch<DocumentTemplate>({
	url: (context) => {
		const clinicId = context.getNodeParameter('clinicId', '', { extractValue: true }) as string;
		return `/open_api/v4/clinics/${clinicId}/document_templates?type=0`;
	},
	requiresClinicId: true,
	nameFormatter: (template) => template.name || `Template ${template.id.slice(0, 8)}`,
});
