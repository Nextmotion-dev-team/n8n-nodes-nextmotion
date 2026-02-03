# Field Definition Audit Report

Date: 2026-02-03
Status: ✅ ALL ISSUES FIXED

## Summary

Multiple resources have field definitions that **DO NOT match** the OpenAPI schema. This will cause API requests to fail.

---

## ✅ FIXED ISSUES

### 1. ✅ Prescription Create - **FIXED**

**Current Implementation (INCORRECT):**
- `medication_name` (required) ❌ **Does not exist in schema**
- `dosage` (optional) ❌ **Does not exist in schema**
- `duration` (optional) ❌ **Does not exist in schema**
- `notes` (optional) ❌ **Does not exist in schema**

**Actual Schema (`OApiPatientPrescriptionCreate`):**
```json
{
  "required": ["title"],
  "properties": {
    "title": "string (max 256) - Short title or heading",
    "content": "string (HTML) - Full prescription instructions including dosage, frequency, duration",
    "document_template": "UUID - Template to render PDF",
    "autocomplete": "object - Questionnaire answers"
  }
}
```

**Verdict:** ✅ **FIXED** - Rewritten with correct fields (title, content, document_template)

---

### 2. ✅ Prescription Update - **FIXED**

**Current Implementation (INCORRECT):**
- Same wrong fields as create: `medication_name`, `dosage`, `duration`, `notes`

**Actual Schema:** Same as create (OApiPatientPrescriptionCreate is used for PUT)

**Verdict:** ✅ **FIXED** - Rewritten with correct fields (title, content, document_template)

---

### 3. ✅ Treatment Create - **FIXED**

**Current Implementation:**
- `treatment_type_id` (required) ❌ **Wrong name, should be `treatment_type`**
- `quantity` (optional) ✓ Correct
- `notes` (optional) ✓ Correct

**Actual Schema (`OApiPatientTreatmentCreate`):**
```json
{
  "required": ["consultation", "treatment_pricing", "treatment_type"],
  "properties": {
    "assistant": "UUID - Assistant provider",
    "consultation": "UUID - Associated consultation (REQUIRED)",
    "notes": "string - Notes",
    "provider": "UUID - Provider",
    "quantity": "integer - Quantity",
    "secretary": "UUID - Secretary",
    "text": "string - Additional text",
    "treatment_pricing": "UUID - Pricing (REQUIRED)",
    "treatment_time": "datetime - Time",
    "treatment_type": "UUID - Type (REQUIRED)",
    "zone": "UUID - Zone"
  }
}
```

**Missing Required Fields:**
- ❌ `consultation` (UUID, required)
- ❌ `treatment_pricing` (UUID, required)

**Missing Optional Fields:**
- ❌ `assistant` (UUID)
- ❌ `provider` (UUID)
- ❌ `secretary` (UUID)
- ❌ `text` (string)
- ❌ `treatment_time` (datetime)
- ❌ `zone` (UUID)

**Wrong Field Names:**
- ❌ `treatment_type_id` should be `treatment_type`

**Verdict:** ✅ **FIXED** - Added all 3 required fields (consultation, treatment_type, treatment_pricing) + all optional fields

---

### 4. ✅ Treatment Update - **FIXED**

**Current Implementation:**
- `treatment_type_id` ❌ **Wrong name, should be `treatment_type`**
- `quantity` ✓ Correct
- `notes` ✓ Correct

**Actual Schema (`OApiTreatmentUpdate`):**
```json
{
  "required": null,
  "properties": {
    "assistant": "UUID",
    "notes": "string",
    "provider": "UUID",
    "quantity": "integer",
    "secretary": "UUID",
    "text": "string",
    "treatment_pricing": "UUID",
    "treatment_time": "datetime",
    "treatment_type": "UUID (not treatment_type_id)",
    "zone": "UUID"
  }
}
```

**Missing Fields (7 out of 10):**
- ❌ `assistant` (UUID)
- ❌ `provider` (UUID)
- ❌ `secretary` (UUID)
- ❌ `text` (string)
- ❌ `treatment_pricing` (UUID)
- ❌ `treatment_time` (datetime)
- ❌ `zone` (UUID)

**Wrong Field Names:**
- ❌ `treatment_type_id` should be `treatment_type`

**Verdict:** ✅ **FIXED** - Renamed treatment_type_id to treatment_type + added all 7 missing optional fields

---

### 5. ✅ Patient Create - **FIXED**

**Current Implementation (13 fields):**
- `email` (required) ✓
- `first_name` (required) ✓
- `last_name` (required) ✓
- `gender` (required) ✓
- `birth_date` (optional) ✓
- `city` (optional) ✓
- `doctor_comments` (optional) ✓
- `is_archived` (optional) ✓
- `patient_number` (optional) ✓
- `phone_number` (optional) ✓
- `postal_address` (optional) ✓
- `zip_code` (optional) ✓
- `doctor` (optional) ❌ **MISSING**

**Actual Schema (`OApiClinicPatientCreate`):**
```json
{
  "required": ["email", "first_name", "gender", "last_name"],
  "properties": [13 total, including "doctor": "UUID - Doctor ID of patient provider"]
}
```

**Missing Field:**
- ❌ `doctor` (UUID, optional) - "Doctor ID of the patient provider"

**Verdict:** ✅ **FIXED** - Added doctor field

---

### 6. ✅ Patient Update - **FIXED**

**Status:** Same schema as create, so also missing `doctor` field

**Verdict:** ✅ **FIXED** - Added doctor field

---

## ✅ CORRECT IMPLEMENTATIONS

The following resources have been verified as correct:

1. **Lead Create** ✓
   - All 4 required fields present: `email`, `first_name`, `last_name`, `phone_number`
   - Optional fields: `notes`, `source`

2. **Lead Update** ✓
   - Same fields as create, all optional

3. **Visit Create** ✓
   - All 5 required fields present: `patient`, `subject`, `visit_time`, `visit_end_time`, `color`
   - Optional fields present

4. **Visit Update** ✓
   - Correct optional fields

5. **Payment Update** ✓
   - Correct payment method fields

6. **Call Create** ✓
   - Correct optional fields

7. **Communication Record Create** ✓
   - All 3 required fields present: `communication_template_kind`, `communication_template_type`, `object`

8. **Calendar Appointment Update** ✓
   - Correct optional fields

9. **Invoice Update** ✓
   - Correct optional fields

10. **Quote Update** ✓
    - Correct optional fields

11. **Webhook Create/Update** ✓
    - Inline fields are correct

---

## ✅ ALL FIXES COMPLETED

### ✅ Priority 1 - CRITICAL (FIXED):
1. ✅ **Prescription Create** - Rewritten with correct schema fields
2. ✅ **Prescription Update** - Rewritten with correct schema fields
3. ✅ **Treatment Create** - Added required fields + fixed field names

### ✅ Priority 2 - MAJOR (FIXED):
4. ✅ **Treatment Update** - Fixed field names + added all 7 optional fields

### ✅ Priority 3 - MINOR (FIXED):
5. ✅ **Patient Create** - Added `doctor` field
6. ✅ **Patient Update** - Added `doctor` field

---

## ✅ FILES FIXED

All the following files have been updated with correct schema-based field definitions:

```
✅ nodes/NextMotion/resources/prescription/create.ts
✅ nodes/NextMotion/resources/prescription/update.ts
✅ nodes/NextMotion/resources/treatment/create.ts
✅ nodes/NextMotion/resources/treatment/update.ts
✅ nodes/NextMotion/resources/patient/create.ts
✅ nodes/NextMotion/resources/patient/update.ts
```

## ✅ BUILD STATUS

- ✅ **Linter:** PASSING
- ✅ **TypeScript Build:** SUCCESSFUL
- ✅ **All Tests:** PASSING

## RECOMMENDATIONS FOR FUTURE

1. **Schema Validation:** Consider implementing automated schema validation in CI/CD
2. **Documentation:** Always reference OpenAPI schema when adding new fields
3. **Testing:** Test all create/update operations against actual NextMotion API
4. **Code Review:** Verify field names match schema exactly before merging

---

## Schema References

All field definitions should match these schemas from `openapi-schema.json`:

- Patient Create/Update: `OApiClinicPatientCreate`
- Prescription Create/Update: `OApiPatientPrescriptionCreate`
- Treatment Create: `OApiPatientTreatmentCreate`
- Treatment Update: `OApiTreatmentUpdate`
- Lead Create: `ClinicLeadCreate`
- Lead Update: `LeadUpdate`
- Visit Create: `V2ClinicVisitCreate`
- Visit Update: `OApiVisitUpdate`
- Payment Update: `PaymentUpdate`
- And so on...
