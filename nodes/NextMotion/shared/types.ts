// ============================================================================
// ENUMS
// ============================================================================

export type GenderEnum = 0 | 1 | 2; // 0=Female, 1=Male, 2=Other

export type InvoiceStatusEnum = 2 | 3 | 4 | 5 | 6 | 9 | 10 | 11 | 12;

export type QuoteStatusEnum = 1 | 2 | 3 | 4 | 5 | 6;

export type ConsentFormStatusEnum = 1 | 2 | 4;

export type AppointmentStatusEnum =
	| 'none'
	| 'confirmed'
	| 'waiting_for_confirmation'
	| 'waiting_room'
	| 'treatment_room'
	| 'paid'
	| 'canceled_last_minute'
	| 'absent'
	| 'late'
	| 'package'
	| 'with_provider'
	| 'seen_by_provider'
	| 'new_patient'
	| 'internet_booking'
	| 'suspended'
	| 'deleted';

export type CallSourceEnum =
	| 'nextmotion'
	| 'cloudtalk_integration'
	| 'ubicentrex_integration'
	| 'twilio_integration';

export type CommunicationEventSourceEnum =
	| 'nextmotion'
	| 'sendgrid'
	| 'twilio'
	| 'evolution'
	| 'sendgrid_integration'
	| 'brevo_integration';

export type CommunicationEventTypeEnum =
	| 'processed'
	| 'dropped'
	| 'deferred'
	| 'bounced'
	| 'delivered'
	| 'opened';

export type CommunicationTemplateKindEnum = 'email' | 'sms' | 'whatsapp';

export type ObjectLabelTypeEnum = 'patient' | 'call' | 'quote';

export type MediaTypeEnum = 0 | 1;

export type FileDataTypeEnum = 0 | 1 | 2;

export type FileStatusEnum = 1 | 2;

export type MediaRecordKindEnum = 0 | 1 | 2 | 3 | 10 | 11;

export type UserTypeEnum = 0 | 1 | 2 | 3 | 4 | 5;

export type OpeningHourTypeEnum = 'none' | 'provider' | 'room';

export type TreatmentSessionStatusEnum =
	| 'none'
	| 'new'
	| 'planned'
	| 'paid'
	| 'package'
	| 'control';

export type SpecialityEnum =
	| 'aesthetic_doctor'
	| 'plastic_surgeon'
	| 'dental_surgeon'
	| 'digestive_surgeon'
	| 'visceral_surgeon'
	| 'other_surgeon'
	| 'clinic_owner'
	| 'clinic_manager'
	| 'intern_or_student'
	| 'industry_representative'
	| 'distributor'
	| 'old_distributor'
	| 'clinic_team_member'
	| 'dermatologist'
	| 'injecting_nurse'
	| 'assistant'
	| 'marketing_industry'
	| 'marketing_doctor_or_clinic'
	| 'teaching_school'
	| 'journalist'
	| 'beautician'
	| 'kinesitherapist'
	| 'dietician'
	| 'epilation'
	| 'anesthesiologist';

// ============================================================================
// COMMON / SHARED TYPES
// ============================================================================

export interface PaginatedResponse<T> {
	data: T[];
	next: string | null;
	previous: string | null;
}

export interface File {
	id: string;
	media_file: string | null;
	file_uti: string | null;
	file_size: number | null;
	width: number | null;
	height: number | null;
	status: FileStatusEnum;
}

export interface PdfDocumentFile {
	id: string;
	media_file: string | null;
	file_uti: string | null;
}

export interface PatientName {
	id: string;
	first_name: string;
	last_name: string;
}

export interface PatientNameAndPhotograph {
	id: string;
	first_name: string;
	last_name: string;
	photograph: File;
	preview_photograph: File;
}

export interface DoctorName {
	id: string;
	prefixed_name: string;
}

export interface SurveyFormName {
	id: string;
	name: string;
	created_time: string;
	modified_time: string;
}

// ============================================================================
// CLINIC
// ============================================================================

export interface Clinic {
	id: string;
	name: string;
	domain: string;
	street_address: string;
	city: string;
	zip_code: string;
	country: string;
	phone_number: string;
	preferred_language: string;
	timezone: string;
	latitude: string | null;
	longitude: string | null;
	logo: string | null;
	preview_logo: string | null;
	created_time: string;
	modified_time: string;
}

export type ClinicsResponse = PaginatedResponse<Clinic>;

// ============================================================================
// PATIENT
// ============================================================================

export interface Patient {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	gender: string;
	birth_date: string;
	age: string;
	postal_address: string;
	city: string;
	zip_code: string;
	country: string;
	latitude: string;
	longitude: string;
	patient_number: string;
	doctor_comments: string;
	is_archived: boolean;
	has_email_contact_consent: string;
	has_phone_contact_consent: string;
	has_sms_contact_consent: string;
	has_post_contact_consent: string;
	created_time: string;
	modified_time: string;
}

export type PatientsResponse = PaginatedResponse<Patient>;

export interface CalendarPatient {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	birth_date: string;
	age: number;
	gender: number;
	zip_code: string;
	is_active: boolean;
	allow_appointment_requests: boolean;
	created_time: string;
	modified_time: string;
}

export interface PatientStats {
	first_visit_time: string | null;
	last_visit_time: string | null;
	last_media_event_time: string | null;
	last_opened_time: string | null;
	media_event_count: number;
	invoiced_total: string;
	paid_total: string;
	quoted_total: string;
	credit_note_total: string;
	reimbursed_total: string;
	reimbursments_total: string;
}

// ============================================================================
// DOCTOR
// ============================================================================

export interface Doctor {
	id: string;
	first_name: string;
	last_name: string;
	title: string;
	prefixed_name: string;
	is_disabled: boolean;
	created_time: string;
	modified_time: string;
}

export type DoctorsResponse = PaginatedResponse<Doctor>;

export interface CalendarEventDoctor {
	id: string;
	prefixed_name: string;
	color: string;
	photograph: File;
	preview_photograph: File;
	created_time: string;
	modified_tme: string;
}

export interface PubApiDoctor {
	id: string;
	prefixed_name: string;
}

// ============================================================================
// CALENDAR EVENT
// ============================================================================

export interface CalendarEvent {
	id: string;
	title: string;
	subtitle: string;
	notes: string;
	color: string;
	type: string;
	recurrence: string;
	start_time: string;
	start_time_utc_offset: string;
	start_time_utc_offset_seconds: number;
	end_time: string;
	end_time_utc_offset: string;
	end_time_utc_offset_seconds: number;
	initial_start_time: string;
	initial_end_time: string;
	duration_minutes: number;
	treatment_session_status: string;
	appointment_room_id: string;
	custom_recurrence_end_date: string;
	custom_recurrence_interval: string;
	custom_recurrence_step: number;
	custom_recurrence_month_by_day_number: boolean;
	custom_recurrence_week_days: number[];
	appointment_scheduled_sms: string;
	appointment_scheduled_whatsapp_msg: string;
	appointment_reminder_sms: string;
	appointment_reminder_whatsapp_msg: string;
	appointment_canceled_sms: string;
	appointment_canceled_whatsapp_msg: string;
	doctors: CalendarEventDoctor[];
	appointment_rooms: CalendarEventAppointmentRoom[];
	resource_ids: string[];
	created_time: string;
	modified_time: string;
}

export interface CalendarEventAppointmentRoom {
	id: string;
	name: string;
	color: string;
	created_time: string;
	modified_time: string;
}

// ============================================================================
// CALENDAR APPOINTMENT
// ============================================================================

export interface CalendarAppointmentDevice {
	id: string;
	name: string;
	created_time: string;
	modified_time: string;
}

export interface CalendarAppointmentRequest {
	id: string;
	status: string;
	created_time: string;
	modified_time: string;
}

export interface CalendarAppointment {
	id: string;
	status: string;
	statuses: AppointmentStatusEnum[];
	subject: string;
	patient: CalendarPatient;
	calendar_event: CalendarEvent;
	visit_type: BasicVisitType;
	sub_visit_type: BasicSubVisitType;
	device: CalendarAppointmentDevice;
	room: CalendarEventAppointmentRoom;
	request: CalendarAppointmentRequest;
	created_time: string;
	modified_time: string;
}

export type CalendarAppointmentsResponse = PaginatedResponse<CalendarAppointment>;

// ============================================================================
// VISIT TYPE
// ============================================================================

export interface BasicVisitType {
	id: string;
	subject: string;
	color: string;
	duration_minutes: number;
	has_bolt_note: boolean;
	has_provider_sign: boolean;
	has_quickfill_note_tmpl: boolean;
	category: VisitTypeCategory;
	bolt_note: SurveyFormName;
	journey_steps_order: string[];
	created_time: string;
	modified_time: string;
}

export interface BasicSubVisitType {
	id: string;
	subject: string;
	color: string;
	duration_minutes: number;
	has_bolt_note: boolean;
	created_time: string;
	modified_time: string;
}

export interface AppointmentTreatmentPresetPricing {
	id: string;
	price: string;
	details: string;
}

export interface AppointmentTreatmentPreset {
	quantity: number;
	treatment_pricing: AppointmentTreatmentPresetPricing;
}

export interface VisitType {
	id: string;
	subject: string;
	color: string;
	price: string;
	duration_minutes: number;
	position: number;
	clinic_chain_id: string | null;
	next_visit_reminder_days: number | null;
	display_in_agenda: boolean;
	display_in_appointment_form: boolean;
	display_in_dashboard: boolean;
	display_in_patient_file: boolean;
	has_provider_sign: boolean;
	enable_treatment_pre_payments: boolean;
	has_bolt_note: string;
	has_quickfill_note_tmpl: string;
	sub_visit_types: BasicSubVisitType[];
	appointment_treatment_presets: AppointmentTreatmentPreset[];
	category: VisitTypeCategory;
	bolt_note: SurveyFormName;
	journey_steps_order: string[];
	created_time: string;
	modified_time: string;
}

export type VisitTypesResponse = PaginatedResponse<VisitType>;

export interface VisitTypeCategory {
	id: string;
	name: string;
	position: number;
	speciality: SpecialityEnum | null;
	created_time: string;
	modified_time: string;
}

export type VisitTypeCategoriesResponse = PaginatedResponse<VisitTypeCategory>;

export interface PubApiSubVisitType {
	id: string;
	subject: string;
	price: string;
	duration_minutes: number;
	created_time: string;
	modified_time: string;
}

export interface PubApiVisitType {
	id: string;
	subject: string;
	price: string;
	duration_minutes: number;
	sub_visit_types: PubApiSubVisitType[];
}

// ============================================================================
// SUB VISIT TYPE
// ============================================================================

export interface SubVisitType {
	id: string;
	subject: string;
	color: string;
	price: string;
	duration_minutes: number;
	next_visit_reminder_days: number | null;
	display_in_agenda: boolean;
	display_in_appointment_form: boolean;
	display_in_dashboard: boolean;
	display_in_patient_file: boolean;
	has_provider_sign: boolean;
	enable_treatment_pre_payments: boolean;
	has_bolt_note: string;
	has_bolt_note_fields_tmpl: string;
	visit_type: BasicVisitType;
	bolt_note: SurveyFormName;
	appointment_treatment_presets: AppointmentTreatmentPreset[];
	created_time: string;
	modified_time: string;
}

export type SubVisitTypesResponse = PaginatedResponse<SubVisitType>;

// ============================================================================
// OPENING HOURS
// ============================================================================

export interface OpeningHour {
	id: string;
	time_slot: string;
	type: OpeningHourTypeEnum;
	utc_offset: string;
}

export type OpeningHoursResponse = {
	data: OpeningHour[];
};

// ============================================================================
// TREATMENT
// ============================================================================

export interface TreatmentPricing {
	id: string;
	price: string;
	rebate: string;
	details: string;
	sessions: number;
	vat_rate: string;
	accounting_code: string;
	subpricing: TreatmentSubpricing[];
	created_time: string;
	modified_time: string;
}

export interface TreatmentSubpricing {
	id: string;
	price: string;
	details: string;
}

export type TreatmentPricingsResponse = PaginatedResponse<TreatmentPricing>;

export interface Treatment {
	id: string;
	text: string;
	notes: string;
	zone: string;
	quantity: number;
	treatment_time: string;
	treatment_type: string | null;
	treatment_pricing: string | null;
	consultation: string;
	invoice: string;
	quote: string;
	consent_form: string;
	pricing: TreatmentPricing;
	provider: DoctorName;
	assistant: DoctorName;
	secretary: DoctorName;
	created_time: string;
	modified_time: string;
}

export type TreatmentsResponse = PaginatedResponse<Treatment>;

// ============================================================================
// TREATMENT TYPE
// ============================================================================

export interface TreatmentType {
	id: string;
	name: string;
	created_time: string;
	modified_time: string;
}

export type TreatmentTypesResponse = PaginatedResponse<TreatmentType>;

// ============================================================================
// CONSULTATION
// ============================================================================

export interface Consultation {
	id: string;
	name: string;
	created_time: string;
	modified_time: string;
}

export type ConsultationsResponse = PaginatedResponse<Consultation>;

export interface CalendarConsultation {
	id: string;
	name: string;
	created_time: string;
	modified_time: string;
}

// ============================================================================
// PRESCRIPTION
// ============================================================================

export interface Prescription {
	id: string;
	title: string;
	content: string;
	patient: PatientName;
	document: PdfDocumentFile;
	created_time: string;
	modified_time: string;
}

export type PrescriptionsResponse = PaginatedResponse<Prescription>;

// ============================================================================
// CONSENT FORM
// ============================================================================

export interface ConsentForm {
	id: string;
	name: string;
	status: ConsentFormStatusEnum;
	document: PdfDocumentFile;
	last_email_send_time: string | null;
	created_time: string;
	modified_time: string;
}

// ============================================================================
// VISIT
// ============================================================================

export interface Visit {
	id: string;
	subject: string;
	note: string;
	text_note: string;
	preview_text_note: string;
	color: string;
	visit_time: string;
	visit_end_time: string;
	audio_transcript: string;
	quickfill_fields: Record<string, unknown>;
	quickfill_fields_tmpl: Record<string, unknown>;
	patient: PatientName;
	visit_type: BasicVisitType;
	sub_visit_type: BasicSubVisitType;
	document: PdfDocumentFile;
	audio: File;
	created_time: string;
	modified_time: string;
}

export type VisitsResponse = PaginatedResponse<Visit>;

// ============================================================================
// INVOICE
// ============================================================================

export interface InvoicedTreatment {
	id: string;
	name: string;
	details: string;
	position: number;
	quantity: number;
	price: string;
	markup: string;
	rebate: string;
	rebate_percent: string;
	vat_rate: string;
	vat_price: string;
	vat_excl_price: string;
	treatment: string | null;
	subpricing: TreatmentSubpricing[];
	created_time: string;
	modified_time: string;
}

export interface Invoice {
	id: string;
	title: string;
	free_text: string;
	number: number | null;
	number_id: string | null;
	status: InvoiceStatusEnum;
	invoiced_time: string;
	overridden_created_time: string | null;
	ref_quote_id: string | null;
	payment_methods: string;
	rebate: string;
	rebate_details: string;
	rebate_percent: string;
	rebate_vat_rate: string;
	sub_total_vat_excl_price: string;
	sub_total_vat_incl_price: string;
	total_net_price: string;
	total_price: string;
	total_vat_price: string;
	vat_price: string;
	invoiced_treatments: InvoicedTreatment[];
	patient: PatientName;
	document: PdfDocumentFile;
	created_time: string;
	modified_time: string;
}

export type InvoicesResponse = PaginatedResponse<Invoice>;

// ============================================================================
// QUOTE
// ============================================================================

export interface QuotedTreatment {
	id: string;
	name: string;
	details: string;
	position: number;
	quantity: number;
	price: string;
	markup: string;
	rebate: string;
	rebate_percent: string;
	vat_rate: string;
	vat_price: string;
	vat_excl_price: string;
	treatment: string | null;
	subpricing: TreatmentSubpricing[];
	created_time: string;
	modified_time: string;
}

export interface Quote {
	id: string;
	title: string;
	free_text: string;
	notes: string;
	template_text: string;
	number: number | null;
	number_id: string | null;
	status: QuoteStatusEnum;
	rebate: string;
	rebate_details: string;
	rebate_percent: string;
	sub_total_vat_excl_price: string;
	sub_total_vat_incl_price: string;
	total_net_price: string;
	total_price: string;
	total_vat_price: string;
	vat_price: string;
	quoted_treatments: QuotedTreatment[];
	document: PdfDocumentFile;
	created_time: string;
	modified_time: string;
}

export type QuotesResponse = PaginatedResponse<Quote>;

// ============================================================================
// PAYMENT
// ============================================================================

export interface PaymentSubpayment {
	invoice_id: string;
	amount: string;
}

export interface PaymentCustomMedium {
	name: string;
	amount: string;
}

export interface Payment {
	id: string;
	cash: string;
	card: string;
	check: string;
	transfer: string;
	stripe: string;
	voucher: string;
	other: string;
	deferred: string | null;
	custom_medium_list: PaymentCustomMedium[];
	subpayment: PaymentSubpayment;
	created_time: string;
	modified_time: string;
}

export type PaymentsResponse = PaginatedResponse<Payment>;

// ============================================================================
// LEAD
// ============================================================================

export interface Lead {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	notes: string;
	source: string;
	is_done: boolean;
	created_time: string;
	modified_time: string;
}

export type LeadsResponse = PaginatedResponse<Lead>;

// ============================================================================
// APPOINTMENT REQUEST
// ============================================================================

export interface AppointmentRequest {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	birth_date: string | null;
	age: number;
	gender: number | null;
	appointment_room_id: string | null;
	start_time: string;
	start_time_utc_offset: string;
	start_time_utc_offset_seconds: number;
	end_time: string;
	end_time_utc_offset: string;
	end_time_utc_offset_seconds: number;
	pre_payment_url: string;
	pre_payment_message: string;
	doctor: PubApiDoctor;
	visit_type: PubApiVisitType;
	sub_visit_type: PubApiSubVisitType;
	created_time: string;
	modified_time: string;
}

export type AppointmentRequestsResponse = PaginatedResponse<AppointmentRequest>;

// ============================================================================
// COMMUNICATION RECORD
// ============================================================================

export interface CommunicationRecordEvent {
	id: string;
	type: CommunicationEventTypeEnum;
	source: CommunicationEventSourceEnum;
	error_code: string;
	has_error: string;
	created_time: string;
	modified_time: string;
}

export interface CommunicationRecord {
	id: string;
	subject: string;
	from_email: string;
	to_email: string | null;
	to_phone_number: string | null;
	communication_template_kind: CommunicationTemplateKindEnum;
	communication_template_type: string;
	events: CommunicationRecordEvent[];
	created_time: string;
	modified_time: string;
}

export type CommunicationRecordsResponse = PaginatedResponse<CommunicationRecord>;

// ============================================================================
// MEDIA
// ============================================================================

export interface MediaFile {
	id: string;
	media_file: string | null;
	file_uti: string | null;
	file_size: number | null;
	width: number | null;
	height: number | null;
}

export interface MediaAsset {
	id: string;
	name: string | null;
	media_type: MediaTypeEnum;
	image: MediaFile;
	video: MediaFile;
	preview: MediaFile;
	created_time: string;
	modified_time: string;
}

export interface MediaMontage {
	id: string;
	name: string;
	file_data_type: FileDataTypeEnum;
	consultation: CalendarConsultation;
	patient: PatientName;
	media: MediaAsset;
	preview_image: MediaFile;
	created_time: string;
	modified_time: string;
}

export type MediaMontagesResponse = PaginatedResponse<MediaMontage>;

export interface MediaRecord {
	id: string;
	name: string;
	kind: MediaRecordKindEnum;
	media_assets: MediaAsset[];
	consultation: CalendarConsultation;
	patient: PatientName;
	preview_image: MediaFile;
	created_time: string;
	modified_time: string;
}

export type MediaRecordsResponse = PaginatedResponse<MediaRecord>;

export interface PhotoCompare {
	id: string;
	angle: number | null;
	consultation: CalendarConsultation;
	patient: PatientName;
	first_photo: MediaFile;
	second_photo: MediaFile;
	compose_image: MediaFile;
	preview_image: MediaFile;
	created_time: string;
	modified_time: string;
}

export type PhotoComparesResponse = PaginatedResponse<PhotoCompare>;

// ============================================================================
// APPOINTMENT DEVICE
// ============================================================================

export interface AppointmentDevice {
	id: string;
	name: string;
	note_count: string;
	certificate_document_count: string;
	regular_document_count: string;
	visit_types: BasicVisitType[];
	sub_visit_types: BasicSubVisitType[];
	created_time: string;
	modified_time: string;
}

export type AppointmentDevicesResponse = PaginatedResponse<AppointmentDevice>;

// ============================================================================
// APPOINTMENT ROOM
// ============================================================================

export interface AppointmentRoom {
	id: string;
	name: string;
	color: string;
	position: number;
	activate_online_booking: boolean;
	created_time: string;
	modified_time: string;
}

export type AppointmentRoomsResponse = PaginatedResponse<AppointmentRoom>;

// ============================================================================
// CALENDAR JOURNEY
// ============================================================================

export interface CalendarJourney {
	id: string;
	calendar_event: CalendarEvent;
	appointment_room: CalendarEventAppointmentRoom;
	consultation: CalendarConsultation;
	patient: CalendarPatient;
	visit_type: BasicVisitType;
	sub_visit_type: BasicSubVisitType;
	completed_steps: string[];
	required_steps: string[];
	created_time: string;
	modified_time: string;
}

export type CalendarJourneysResponse = PaginatedResponse<CalendarJourney>;

// ============================================================================
// CALL
// ============================================================================

export interface Call {
	id: string;
	phone_number: string;
	notes: string;
	transcript: string;
	time: string;
	time_utc_offset: string;
	time_utc_offset_seconds: number;
	recording_url: string;
	play_recording_url: string;
	source_id: string;
	source: CallSourceEnum;
	status: string;
	patient: PatientName;
	created_time: string;
	modified_time: string;
}

export type CallsResponse = PaginatedResponse<Call>;

// ============================================================================
// DOCUMENT TEMPLATE
// ============================================================================

export interface DocumentTemplate {
	id: string;
	name: string;
	type: string;
	autoshow: boolean;
	display_in_consultations: boolean;
	has_autocomplete_template: string;
	has_patient_sign: string;
	has_source: string;
	has_template_text: string;
	doctor: DoctorName;
	master: DocumentTemplateMaster;
	template_texts: TemplateText[];
	created_time: string;
	modified_time: string;
}

export interface DocumentTemplateMaster {
	id: string;
	name: string;
}

export interface TemplateText {
	subject: string;
	html: string;
}

export type DocumentTemplatesResponse = PaginatedResponse<DocumentTemplate>;

// ============================================================================
// OBJECT LABEL
// ============================================================================

export interface ObjectLabel {
	id: string;
	name: string;
	color: string;
	type: ObjectLabelTypeEnum;
	created_time: string;
	modified_time: string;
}

export type ObjectLabelsResponse = PaginatedResponse<ObjectLabel>;

// ============================================================================
// SURVEY FORM
// ============================================================================

export interface SurveyForm {
	id: string;
	name: string;
	type: string;
	clinic: string | null;
	clinic_chain: string | null;
	fields_tmpl: Record<string, unknown>;
	note_tmpl: Record<string, unknown>;
	custom_patient_fields_tmpl: Record<string, unknown>;
	created_time: string;
	modified_time: string;
}

export type SurveyFormsResponse = PaginatedResponse<SurveyForm>;
