import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { appointmentDeviceDescription } from './resources/appointmentDevice';
import { appointmentRequestDescription } from './resources/appointmentRequest';
import { appointmentRoomDescription } from './resources/appointmentRoom';
import { calendarAppointmentDescription } from './resources/calendarAppointment';
import { calendarJourneyDescription } from './resources/calendarJourney';
import { callDescription } from './resources/call';
import { clinicDescription } from './resources/clinic';
import { communicationRecordDescription } from './resources/communicationRecord';
import { consultationDescription } from './resources/consultation';
import { doctorDescription } from './resources/doctor';
import { documentTemplateDescription } from './resources/documentTemplate';
import { invoiceDescription } from './resources/invoice';
import { leadDescription } from './resources/lead';
import { mediaMontageDescription } from './resources/mediaMontage';
import { mediaRecordDescription } from './resources/mediaRecord';
import { objectLabelDescription } from './resources/objectLabel';
import { patientDescription } from './resources/patient';
import { paymentDescription } from './resources/payment';
import { photoCompareDescription } from './resources/photoCompare';
import { prescriptionDescription } from './resources/prescription';
import { quoteDescription } from './resources/quote';
import { subVisitTypeDescription } from './resources/subVisitType';
import { surveyFormDescription } from './resources/surveyForm';
import { treatmentDescription } from './resources/treatment';
import { treatmentPricingDescription } from './resources/treatmentPricing';
import { treatmentTypeDescription } from './resources/treatmentType';
import { visitDescription } from './resources/visit';
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
					{
						name: 'Appointment Device',
						value: 'appointmentDevice',
					},
					{
						name: 'Appointment Request',
						value: 'appointmentRequest',
					},
					{
						name: 'Appointment Room',
						value: 'appointmentRoom',
					},
					{
						name: 'Calendar Appointment',
						value: 'calendarAppointment',
					},
					{
						name: 'Calendar Journey',
						value: 'calendarJourney',
					},
					{
						name: 'Call',
						value: 'call',
					},
					{
						name: 'Clinic',
						value: 'clinic',
					},
					{
						name: 'Communication Record',
						value: 'communicationRecord',
					},
					{
						name: 'Consultation',
						value: 'consultation',
					},
					{
						name: 'Doctor',
						value: 'doctor',
					},
					{
						name: 'Document Template',
						value: 'documentTemplate',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Media Montage',
						value: 'mediaMontage',
					},
					{
						name: 'Media Record',
						value: 'mediaRecord',
					},
				{
					name: 'Object Label',
					value: 'objectLabel',
				},
				{
					name: 'Patient',
					value: 'patient',
				},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Photo Compare',
						value: 'photoCompare',
					},
					{
						name: 'Prescription',
						value: 'prescription',
					},
					{
						name: 'Quote',
						value: 'quote',
					},
				{
					name: 'Sub Visit Type',
					value: 'subVisitType',
				},
				{
					name: 'Survey Form',
					value: 'surveyForm',
				},
					{
						name: 'Treatment',
						value: 'treatment',
					},
					{
						name: 'Treatment Pricing',
						value: 'treatmentPricing',
					},
					{
						name: 'Treatment Type',
						value: 'treatmentType',
					},
					{
						name: 'Visit',
						value: 'visit',
					},
				{
					name: 'Visit Type',
					value: 'visitType',
				},
				{
					name: 'Webhook',
					value: 'webhook',
				},
			],
				default: 'patient',
			},
			...appointmentDeviceDescription,
			...appointmentRequestDescription,
			...appointmentRoomDescription,
			...calendarAppointmentDescription,
			...calendarJourneyDescription,
			...callDescription,
			...clinicDescription,
			...communicationRecordDescription,
			...consultationDescription,
			...doctorDescription,
			...documentTemplateDescription,
			...invoiceDescription,
			...leadDescription,
			...mediaMontageDescription,
			...mediaRecordDescription,
			...objectLabelDescription,
			...patientDescription,
			...paymentDescription,
			...photoCompareDescription,
			...prescriptionDescription,
			...quoteDescription,
			...subVisitTypeDescription,
			...surveyFormDescription,
			...treatmentDescription,
			...treatmentPricingDescription,
			...treatmentTypeDescription,
			...visitDescription,
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
