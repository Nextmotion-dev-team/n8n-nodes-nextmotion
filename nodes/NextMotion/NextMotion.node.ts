import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountingDistributionDescription } from './resources/accountingDistribution';
import { appointmentDeviceDescription } from './resources/appointmentDevice';
import { appointmentRequestDescription } from './resources/appointmentRequest';
import { appointmentRoomDescription } from './resources/appointmentRoom';
import { calendarAppointmentDescription } from './resources/calendarAppointment';
import { calendarJourneyDescription } from './resources/calendarJourney';
import { calendarOpeningHourDescription } from './resources/calendarOpeningHour';
import { callDescription } from './resources/call';
import { clinicDescription } from './resources/clinic';
import { communicationRecordDescription } from './resources/communicationRecord';
import { communicationTemplateDescription } from './resources/communicationTemplate';
import { consultationDescription } from './resources/consultation';
import { creditNoteDescription } from './resources/creditNote';
import { doctorDescription } from './resources/doctor';
import { documentTemplateDescription } from './resources/documentTemplate';
import { featureDescription } from './resources/feature';
import { globalProductDescription } from './resources/globalProduct';
import { invoiceDescription } from './resources/invoice';
import { leadDescription } from './resources/lead';
import { mediaMontageDescription } from './resources/mediaMontage';
import { mediaRecordDescription } from './resources/mediaRecord';
import { medicalHistoryDescription } from './resources/medicalHistory';
import { objectLabelDescription } from './resources/objectLabel';
import { patientDescription } from './resources/patient';
import { paymentDescription } from './resources/payment';
import { paymentMediumDescription } from './resources/paymentMedium';
import { photoCompareDescription } from './resources/photoCompare';
import { prescriptionDescription } from './resources/prescription';
import { productDescription } from './resources/product';
import { quoteDescription } from './resources/quote';
import { subVisitTypeDescription } from './resources/subVisitType';
import { surveyFormDescription } from './resources/surveyForm';
import { treatmentDescription } from './resources/treatment';
import { treatmentPackageDescription } from './resources/treatmentPackage';
import { treatmentPricingDescription } from './resources/treatmentPricing';
import { treatmentTypeDescription } from './resources/treatmentType';
import { userDescription } from './resources/user';
import { visitDescription } from './resources/visit';
import { visitTypeCategoryDescription } from './resources/visitTypeCategory';
import { visitTypeDescription } from './resources/visitType';
import { webhookDescription } from './resources/webhook';
import { getClinics } from './listSearch/getClinics';
import { getPatients } from './listSearch/getPatients';
import { getDoctors } from './listSearch/getDoctors';
import { getConsultations } from './listSearch/getConsultations';
import { getInvoices } from './listSearch/getInvoices';
import { getQuotes } from './listSearch/getQuotes';
import { getTreatmentTypes } from './listSearch/getTreatmentTypes';
import { getTreatments } from './listSearch/getTreatments';
import { getAppointmentDevices } from './listSearch/getAppointmentDevices';
import { getAppointmentRooms } from './listSearch/getAppointmentRooms';
import { getCalendarAppointments } from './listSearch/getCalendarAppointments';
import { getSubVisitTypes } from './listSearch/getSubVisitTypes';
import { getPayments } from './listSearch/getPayments';
import { getTreatmentPricings } from './listSearch/getTreatmentPricings';
import { getPrescriptions } from './listSearch/getPrescriptions';
import { getVisits } from './listSearch/getVisits';
import { getLeads } from './listSearch/getLeads';
import { getWebhooks } from './listSearch/getWebhooks';
import { getVisitTypes } from './listSearch/getVisitTypes';
import { getSurveyForms } from './listSearch/getSurveyForms';
import {
	getInvoiceDocumentTemplates,
	getQuoteDocumentTemplates,
	getPrescriptionDocumentTemplates,
} from './listSearch/getDocumentTemplates';
import { getDoctorsLoadOptions } from './loadOptions/getDoctors';
import { getAppointmentRoomsLoadOptions } from './loadOptions/getAppointmentRooms';

export class NextMotion implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NextMotion',
		name: 'nextMotion',
		icon: 'file:../../icons/nextmotion.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with NextMotion API for patient care management',
		defaults: {
			name: 'NextMotion',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'nextMotionApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.nextmotion.net',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Accounting Distribution', value: 'accountingDistribution' },
					{ name: 'Appointment Device', value: 'appointmentDevice' },
					{ name: 'Appointment Request', value: 'appointmentRequest' },
					{ name: 'Appointment Room', value: 'appointmentRoom' },
					{ name: 'Calendar Appointment', value: 'calendarAppointment' },
					{ name: 'Calendar Journey', value: 'calendarJourney' },
					{ name: 'Calendar Opening Hour', value: 'calendarOpeningHour' },
					{ name: 'Call', value: 'call' },
					{ name: 'Clinic', value: 'clinic' },
					{ name: 'Communication Record', value: 'communicationRecord' },
					{ name: 'Communication Template', value: 'communicationTemplate' },
					{ name: 'Consultation', value: 'consultation' },
					{ name: 'Credit Note', value: 'creditNote' },
					{ name: 'Doctor', value: 'doctor' },
					{ name: 'Document Template', value: 'documentTemplate' },
					{ name: 'Feature', value: 'feature' },
					{ name: 'Global Product', value: 'globalProduct' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Lead', value: 'lead' },
					{ name: 'Media Montage', value: 'mediaMontage' },
					{ name: 'Media Record', value: 'mediaRecord' },
					{ name: 'Medical History', value: 'medicalHistory' },
					{ name: 'Object Label', value: 'objectLabel' },
					{ name: 'Patient', value: 'patient' },
					{ name: 'Payment', value: 'payment' },
					{ name: 'Payment Medium', value: 'paymentMedium' },
					{ name: 'Photo Compare', value: 'photoCompare' },
					{ name: 'Prescription', value: 'prescription' },
					{ name: 'Product', value: 'product' },
					{ name: 'Quote', value: 'quote' },
					{ name: 'Sub Visit Type', value: 'subVisitType' },
					{ name: 'Survey Form', value: 'surveyForm' },
					{ name: 'Treatment', value: 'treatment' },
					{ name: 'Treatment Package', value: 'treatmentPackage' },
					{ name: 'Treatment Pricing', value: 'treatmentPricing' },
					{ name: 'Treatment Type', value: 'treatmentType' },
					{ name: 'User', value: 'user' },
					{ name: 'Visit', value: 'visit' },
					{ name: 'Visit Type', value: 'visitType' },
					{ name: 'Visit Type Category', value: 'visitTypeCategory' },
					{ name: 'Webhook', value: 'webhook' },
				],
				default: 'patient',
			},
			...accountingDistributionDescription,
			...appointmentDeviceDescription,
			...appointmentRequestDescription,
			...appointmentRoomDescription,
			...calendarAppointmentDescription,
			...calendarJourneyDescription,
			...calendarOpeningHourDescription,
			...callDescription,
			...clinicDescription,
			...communicationRecordDescription,
			...communicationTemplateDescription,
			...consultationDescription,
			...creditNoteDescription,
			...doctorDescription,
			...documentTemplateDescription,
			...featureDescription,
			...globalProductDescription,
			...invoiceDescription,
			...leadDescription,
			...mediaMontageDescription,
			...mediaRecordDescription,
			...medicalHistoryDescription,
			...objectLabelDescription,
			...patientDescription,
			...paymentDescription,
			...paymentMediumDescription,
			...photoCompareDescription,
			...prescriptionDescription,
			...productDescription,
			...quoteDescription,
			...subVisitTypeDescription,
			...surveyFormDescription,
			...treatmentDescription,
			...treatmentPackageDescription,
			...treatmentPricingDescription,
			...treatmentTypeDescription,
			...userDescription,
			...visitDescription,
			...visitTypeCategoryDescription,
			...visitTypeDescription,
			...webhookDescription,
		],
	};

	methods = {
		listSearch: {
			getClinics,
			getPatients,
			getDoctors,
			getConsultations,
			getInvoices,
			getLeads,
			getPayments,
			getPrescriptions,
			getQuotes,
			getTreatmentTypes,
			getTreatmentPricings,
			getTreatments,
			getVisitTypes,
			getVisits,
			getSubVisitTypes,
			getAppointmentDevices,
			getAppointmentRooms,
			getCalendarAppointments,
			getWebhooks,
			getSurveyForms,
			getInvoiceDocumentTemplates,
			getQuoteDocumentTemplates,
			getPrescriptionDocumentTemplates,
		},
		loadOptions: {
			getDoctors: getDoctorsLoadOptions,
			getAppointmentRooms: getAppointmentRoomsLoadOptions,
		},
	};
}
