# n8n-nodes-nextmotion

This is an n8n community node for [NextMotion](https://nextmotion.net/) - a practice management system for medical clinics.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

**Patient**
- Get a patient
- Get many patients in a clinic
- Create a patient
- Update a patient
- Delete a patient
- Get patient statistics

**Calendar Appointment**
- Get an appointment
- Get many appointments in a clinic
- Update an appointment
- Delete an appointment
- Get treatments for an appointment
- Reschedule an appointment

**Invoice**
- Get an invoice
- Get many invoices in a clinic
- Update an invoice
- Delete an invoice
- Pay an invoice
- Validate an invoice

**Quote**
- Get a quote
- Get many quotes in a clinic
- Update a quote
- Delete a quote
- Accept a quote
- Validate a quote

**Consultation**
- Get a consultation
- Get many consultations
- Create an invoice from a consultation
- Create a quote from a consultation

**Treatment**
- Get a treatment
- Get many treatments
- Update a treatment
- Upload consent form

**Prescription**
- Get a prescription
- Get many prescriptions
- Create a prescription
- Update a prescription
- Sign a prescription

**Visit**
- Get a visit
- Get many visits
- Create a visit
- Update a visit

**And 20+ more resources** including Doctors, Clinics, Treatment Types, Visit Types, Leads, Payments, Communication Records, Media, Webhooks, and more.

## Trigger

**NextMotion Trigger** - Real-time webhook triggers for:
- Patient created, updated, deleted
- Appointment created, updated, deleted, started, ended
- Invoice created, validated, paid
- Quote created, validated, accepted
- Payment created
- Lead created
- Visit created
- And more...

## Credentials

1. Log in to your NextMotion account
2. Go to **Settings → API Keys**
3. Generate a new API key and copy it immediately
4. In n8n, create a **NextMotion API** credential and paste the key

> API keys don't expire. Store securely and regenerate if compromised.

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [NextMotion API Docs](https://api.nextmotion.net/open_api/docs/redoc)

## License

[MIT](LICENSE.md)
