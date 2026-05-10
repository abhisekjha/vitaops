# vitaops — Mode: Advocate
# Activated when: writing medical letters, requesting records, formal communications

## Pre-flight

1. Read `modes/_shared.md` — letter standards
2. Read `config/profile.yml` — full patient identity (name, DOB, member ID)
3. Read `config/providers.yml` — care team details (NPI numbers, addresses)
4. Read `health-profile.md` — clinical context
5. Read relevant evaluation report if one exists

## Letter Types

| Request | Letter Type | Template |
|---------|-------------|----------|
| Insurance denial appeal | `appeal` | templates/appeal-letter.md |
| Prior authorization support | `priorauth` | inline |
| Medical records request | `records` | inline |
| Second opinion referral | `secondopinion` | templates/second-opinion-request.md |
| Letter of medical necessity | `necessity` | inline |
| Complaint to provider | `complaint` | inline |
| Complaint to insurer | `insurer-complaint` | inline |
| Referral request | `referral` | inline |

## Letter Generation Protocol

For every letter:

1. Gather all required fields (ask if not in files)
2. Draft the full letter
3. Save to `output/{###}-letter-{type}-{slug}-{YYYY-MM-DD}.md`
4. Present to user for review — offer edits
5. Provide sending instructions

## Standard Letter: Medical Records Request

```markdown
[Patient Name]
[Address]
[City, State, ZIP]
[Phone]
[Email]
[Date]

Medical Records Department
[Provider / Clinic Name]
[Address]
[City, State, ZIP]

**RE: Request for Medical Records**
**Patient Name:** [Full Name]
**Date of Birth:** [DOB]
**Dates of Service:** [from] to [to] (or "All records on file")
**Treating Physician:** [Dr. Name]

Dear Medical Records Department,

I am requesting a complete copy of my medical records in accordance with my rights under the Health Insurance Portability and Accountability Act (HIPAA), 45 CFR § 164.524, and [State] law.

**Records Requested:**
- [ ] All medical records from [dates]
- [ ] Lab results and diagnostic reports
- [ ] Imaging reports and images (on CD/digital if possible)
- [ ] Consultation notes from all providers
- [ ] Medication history
- [ ] Discharge summaries (if applicable)
- [ ] Billing records

**Preferred Format:** [Electronic via patient portal / Paper copy / Electronic on CD]
**Delivery Method:** [Secure email / Mail / Patient portal / In-person pickup]

Under HIPAA, you are required to provide these records within 30 days of this request. Under [State] law, you may charge a reasonable copying fee not to exceed [state limit].

Please contact me at [phone] or [email] if you need additional information.

Thank you,

[Patient Name]
[Signature]
[Date]
```

## Standard Letter: Referral Request

```markdown
[Date]

Dr. [Primary Care Physician Name]
[Clinic Name]
[Address]

**RE: Referral Request — [Specialty]**
**Patient:** [Name] | **DOB:** [DOB] | **Condition:** [Condition]

Dear Dr. [Name],

I am writing to respectfully request a referral to a [specialty] physician for evaluation of [condition/concern].

**Clinical Reason:**
[Explain why specialist input is needed — symptoms, duration, what's been tried, why PCP management alone isn't sufficient]

**Relevant History:**
- Diagnosis: [condition, date]
- Current treatment: [medications/treatments]
- Response to current treatment: [improving / not improving / worsening]

**Why This Specialty:**
[Specific reason this specialty is appropriate]

**Preferred Specialist:**
[If patient has one in mind: "I would appreciate a referral to Dr. [Name], NPI [NPI], who is in-network with my [plan] insurance."]

I am happy to discuss this at my next appointment or by phone. Thank you for your consideration.

Sincerely,
[Patient Name]
[Phone]
[Date]
```

## Standard Letter: Letter of Medical Necessity (to insurance)

```markdown
[Provider Letterhead — Doctor fills this in]

[Date]

[Insurance Company] — Medical Necessity Review
[Address]

**RE: Letter of Medical Necessity**
**Patient:** [Name] | **DOB:** [DOB] | **Member ID:** [ID]
**Requested Service:** [CPT code — description]
**Diagnosis:** [ICD-10 code — description]
**Treating Physician:** [Name, NPI, Credentials]

To Whom It May Concern,

I am writing to document the medical necessity of [service/procedure/medication] for my patient, [Name].

**Clinical Presentation:**
[Physician describes patient's condition, symptoms, severity, and functional impact]

**Diagnostic Findings:**
[Lab values, imaging results, other objective findings that support the request]

**Treatment History:**
[What has been tried, for how long, and the patient's response — showing why the requested treatment is needed]

**Requested Treatment Rationale:**
[Why this specific treatment, why alternatives are not appropriate]

**Supporting Evidence:**
This treatment is consistent with established clinical guidelines:
- [Guideline citation 1]
- [Guideline citation 2]
- [Peer-reviewed study]

Without this treatment, the patient faces [specific risk / worsening of condition / functional decline].

I am available to discuss this case at [phone number].

Sincerely,

[Physician Name, Credentials]
[NPI]
[Clinic Name]
[Contact Information]
[Date]
```

## STEP: After Draft

1. Save to `output/{###}-letter-{type}-{slug}-{YYYY-MM-DD}.md`
2. Present to user: "Here is your letter. Review it carefully before sending. You may want to:"
   - Have your doctor co-sign if this is a medical necessity letter
   - Send via certified mail if to an insurance company
   - Keep a copy and note the date sent
3. Update `data/pipeline.md` with action item

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Always consult your doctor before making health decisions.*
