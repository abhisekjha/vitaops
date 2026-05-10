# vitaops — Mode: Appointment Prep
# Activated when: user has upcoming doctor appointment to prepare for

## Pre-flight

1. Read `modes/_shared.md` — standards
2. Read `modes/_profile.md` — communication style, advocacy scripts, care philosophy
3. Read `health-profile.md` — full health history for context
4. Read `data/medications.md` — current medications (bring this list)
5. Read `data/appointments.md` — past appointments for continuity
6. Read `config/providers.yml` — care team info
7. Read `config/profile.yml` — insurance info

## STEP 1 — Gather Appointment Details

Ask if not provided:
- Who is the appointment with? (doctor name, specialty)
- What is the appointment for? (routine checkup, follow-up, new symptoms, etc.)
- When is the appointment? (date/time)
- What happened at the last appointment with this provider?
- Any new symptoms or concerns since last visit?
- Any new medications started since last visit?
- Any test results to review at this appointment?

## STEP 2 — Generate Appointment Prep Report

Create report: `reports/{###}-appt-{slug}-{YYYY-MM-DD}.md`

```markdown
# Appointment Prep: {Doctor Name} — {Specialty}

**Report:** #{###} | **Date:** {appointment date} | **Prepared:** {today's date}
**Patient:** {name} | **Provider:** {doctor name, NPI if known}

---

## Appointment Overview

| Field | Details |
|-------|---------|
| Provider | {Dr. Name, Credentials} |
| Specialty | {specialty} |
| Clinic | {clinic name + address} |
| Date & Time | {date, time} |
| Purpose | {visit purpose} |
| Portal | {patient portal URL if known} |

---

## What to Bring

### Documents
- [ ] Photo ID + insurance card (primary and secondary)
- [ ] This prep document (printed or on phone)
- [ ] Complete medication list (see below)
- [ ] Any recent test results, labs, imaging not yet shared with this provider
- [ ] Records from any specialists seen since last visit
- [ ] List of any OTC supplements you're taking

### Practical
- [ ] Arrive 15 minutes early (new patient) or 10 minutes early (established)
- [ ] Know your co-pay amount: ${copay_from_profile} for specialist
- [ ] Bring a notebook or use your phone to take notes
- [ ] Consider bringing a trusted person to be a second set of ears

---

## Your Current Medications

*(From data/medications.md — bring this exact list)*

| Medication | Dose | Frequency | Prescribing Doctor |
|------------|------|-----------|-------------------|
{medications from data/medications.md}

**New since last visit:** {any medications started since last appointment}
**Questions about medications:** {any medication concerns to raise}

---

## Changes Since Last Visit

### New or Worsening Symptoms
{Anything the patient mentioned. Format as: "Symptom — duration — severity 1-10 — triggers/pattern"}

### Lifestyle Changes
{Relevant changes: diet, exercise, stress level, sleep, travel, occupational exposure}

### Events to Report
{Falls, injuries, illnesses, ER visits, urgent care visits since last appointment}

---

## Your Questions for This Visit

*Organized by priority — ask these in order if time is limited.*

### 🔴 Must Ask (don't leave without answers)
1. {Most important question specific to this visit purpose}
2. {Second most important}
3. {Third most important}

### 🟡 Important (ask if time allows)
4. {Follow-up on previous recommendation}
5. {Medication-related question}
6. {Test results question if applicable}

### 🟢 Nice to Cover
7. {Preventive care — screenings due?}
8. {Referral question if applicable}
9. What symptoms should make me call you before my next appointment?
10. When should I go to urgent care vs. ER vs. calling your office?

---

## Red Flags to Report

*Based on your health history, mention these immediately:*
{Personalized based on health-profile.md conditions and _profile.md red flags}

---

## Screening Checklist

*Based on your age, sex, and conditions — ask if you're due for these:*

| Screening | Last Done | Frequency | Due? |
|-----------|-----------|-----------|------|
| Blood pressure | {from records or "unknown"} | Every visit | {yes/no/unknown} |
| A1C (if diabetic) | {from records} | Every 3 months | {yes/no} |
| Colonoscopy | {from records} | Every 10 years (45+) | {yes/no} |
| Mammogram (if applicable) | {from records} | Annually (40+) | {yes/no} |
| Bone density (DEXA) | {from records} | Every 2 years (65+) | {yes/no} |
| Cholesterol (lipid panel) | {from records} | Every 4-6 years | {yes/no} |
| {Other condition-specific screenings} | | | |

---

## After the Appointment

After you leave, come back and tell me:
- What was the diagnosis or plan?
- Were any new medications prescribed?
- Were any referrals made?
- What tests were ordered?
- When is the follow-up?

I'll update your health log, set follow-up reminders, and flag anything in the plan that needs attention.

---

## Insurance Heads-Up

- **Co-pay:** ${copay} expected for this {specialist/PCP} visit
- **Pre-authorization needed:** {check if any likely procedures need PA}
- **In-network:** {verify provider is in-network with your plan}
- **Labs ordered today:** Most routine labs are covered; ask billing if ordering any unusual tests

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Always consult your doctor before making health decisions.*
```

## STEP 3 — Log Appointment

Add to `data/appointments.md`:
```
| {date} | {time} | {provider} | {specialty} | {clinic} | {purpose} | [prep report](../reports/{###}-appt-...) | {notes} |
```

## STEP 4 — Update Pipeline

Add to `data/pipeline.md`:
```
- [ ] {appointment date}: {Dr. Name} ({specialty}) — prep done ✅ | Follow up after visit
```

## STEP 5 — Post-Appointment Follow-up

If user comes back with appointment summary, offer to:
1. Update health log with new diagnosis or plan
2. Research any new medications prescribed
3. Write referral letters if new specialists needed
4. Research any tests ordered so they know what to expect
5. Set next appointment reminder
