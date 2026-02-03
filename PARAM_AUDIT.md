# Parameter Audit Report

Checking if n8n node implementations match OpenAPI schema definitions.

## Issues Found

### ✅ FIXED: Calendar Appointment Reschedule
**Endpoint:** `POST /open_api/v4/calendar_appointments/{calendar_appointment_id}/reschedule`

**Schema:** `OApiCalendarAppointmentReschedule`

**Before:**
- `start_time` (dateTime, required)
- `end_time` (dateTime, required)

**After (corrected to match OpenAPI):**
- `time_slot` (dateTime, required)
- `visit_type_opening_hour` (string/uuid, required)

---

### ✅ FIXED: Calendar Appointment Update
**Endpoint:** `PUT /open_api/v4/calendar_appointments/{calendar_appointment_id}`

**Schema:** `CalendarAppointmentUpdate`

**Was missing:** `calendar_event`, `device`, `room`, `send_appointment_modified_email`, `send_appointment_modified_sms`, `statuses`, `sub_visit_type`

**Now includes all fields from OpenAPI schema:**
- `calendar_event` (collection with structured fields):
  - `title` (string)
  - `notes` (string - textarea)
  - `color` (string - RGBA hex code)
  - `doctors` (string - JSON array of UUIDs)
  - `appointment_rooms` (string - JSON array of UUIDs)
  - `start_time` (dateTime)
  - `end_time` (dateTime)
  - `treatment_session_status` (options: none, new, planned, paid, package, control)
- `device` (resourceLocator with listSearch - `getAppointmentDevices`)
- `room` (resourceLocator with listSearch - `getAppointmentRooms`)
- `send_appointment_modified_email` (boolean)
- `send_appointment_modified_sms` (boolean)
- `status` (enum)
- `statuses` (multiOptions - appointment tags)
- `sub_visit_type` (resourceLocator with listSearch - `getSubVisitTypes`)
- `subject` (string)
- `visit_type` (resourceLocator)

---

### ✅ FIXED: Payment Update
**Endpoint:** `PUT /open_api/v4/payments/{payment_id}`

**Schema:** `PaymentUpdate`

**Was missing:** `autocomplete`, `custom_medium_list`, `deferred`, `subpayment`

**Now uses shared payment field helper with all fields:**
- All payment methods (card, cash, check, other, transfer, voucher_code, voucher_amount)
- `autocomplete` (json)
- `custom_medium_list` (json)
- `deferred` (boolean)
- `do_validate` (boolean)
- `subpayment` (structured fixedCollection)
- `payment_time` (dateTime)

---

## Verified Correct

### ✅ Appointment Request Create
**Endpoint:** `POST /open_api/v4/appointment_requests`
**Schema:** `OApiAppointmentRequestCreate`
All fields match OpenAPI schema.

---

## New ListSearch Methods Added

Created searchable dropdowns for better UX:

1. **getAppointmentDevices** - `/open_api/v4/clinics/{clinic_id}/appointment_devices`
   - Used in: Calendar Appointment Update
   - Displays: Device name

2. **getAppointmentRooms** - `/open_api/v4/clinics/{clinic_id}/appointment_rooms`
   - Used in: Calendar Appointment Update
   - Displays: Room name

3. **getSubVisitTypes** - `/open_api/v4/clinics/{clinic_id}/sub_visit_types?visit_type={visit_type_id}`
   - Used in: Calendar Appointment Update
   - Displays: Sub visit type subject
   - Filtered by: Visit Type selection (dynamic filtering)

4. **getInvoices** - `/open_api/v4/clinics/{clinic_id}/invoices?patient={patient_id}`
   - Used in: Quote Create
   - Displays: Invoice number, date, and title

5. **getQuotes** - `/open_api/v4/clinics/{clinic_id}/quotes?patient={patient_id}`
   - Used in: Invoice Create
   - Displays: Quote number, date, and title

6. **getCalendarAppointments** - `/open_api/v4/clinics/{clinic_id}/calendar_appointments`
   - Used in: Calendar Appointment operations (Get, Update, Delete, Reschedule, Get Treatments)
   - Displays: Subject, patient name, and appointment time
   - Searchable by: Subject and patient name

7. **getPayments** - `/open_api/v4/clinics/{clinic_id}/payments`
   - Used in: Payment operations (Get, Update, Delete)
   - Displays: Total amount, payment methods used, and date
   - Example: "150.00 (Card, Cash) - 2/3/2026"

## Clinic Dependency Fixes

Multiple resources were missing `clinicSelect` for operations that use clinic-dependent `listSearch` methods. See `CLINIC_DEPENDENCY_AUDIT.md` for full details.

### Fixed Resources:
1. ✅ **Prescription** - Added clinic for `create` operation (patient field requires clinic)
2. ✅ **Appointment Request** - Added clinic for `create` operation (doctor field requires clinic)
3. ✅ **Treatment** - Added clinic for `create` and `update` operations (doctor fields require clinic)
4. ✅ **Patient** - Added clinic for `update` operation (doctor field requires clinic)
5. ✅ **Payment** - Added clinic for `get`, `update`, `delete` operations (payment listSearch requires clinic)

---

## Missing Operations

The following operations exist in the API but are not implemented in the n8n node:

1. **Quote Validate** - `POST /open_api/v4/quotes/{quote_id}/validate`
2. **Prescription Sign** - `POST /open_api/v4/prescriptions/{prescription_id}/sign`
3. **Lead Convert to Patient** - `POST /open_api/v4/leads/{lead_id}/convert_to_patient`
4. **Consent Form Upload** - `POST /open_api/v4/treatments/{treatment_id}/consent_forms/upload`
5. **Visit Type Get Opening Hours** - `GET /open_api/v4/clinics/{clinic_id}/visit_types/opening_hours`

---

## Next Steps

1. Fix Calendar Appointment Update to include all fields
2. Fix Payment Update to include all fields (can reuse shared payment fields)
3. Consider adding missing operations based on priority
