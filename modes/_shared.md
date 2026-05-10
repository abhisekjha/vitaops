# vitaops — Shared System Logic
# AUTO-UPDATABLE — do not put personal customizations here (use _profile.md)

## Core Evaluation Standards

### Urgency Scale
| Level | Label | Definition | Response |
|-------|-------|------------|----------|
| 5 | 🚨 EMERGENCY | Life-threatening | Call 911 immediately |
| 4 | ⚡ URGENT | Needs care within 24-48h | Urgent care / ER today |
| 3 | ⚠️ SOON | Needs care within 1-2 weeks | Schedule appointment soon |
| 2 | 📅 ROUTINE | Standard scheduling timeline | Normal appointment |
| 1 | 👁️ MONITOR | Watch and wait | Log symptoms, no action needed |

### Source Hierarchy (cite in this order of preference)
1. Cochrane Reviews (cochranelibrary.com) — highest evidence
2. PubMed systematic reviews and RCTs
3. Clinical guidelines (AHA, ACC, ADA, NCCN, etc.)
4. NIH / NLM resources (nih.gov, nlm.nih.gov)
5. CDC (cdc.gov)
6. Mayo Clinic (mayoclinic.org)
7. Cleveland Clinic (clevelandclinic.org)
8. Merck Manuals (merckmanuals.com)

**Never cite:** Wikipedia, WebMD, Healthline, Everyday Health as primary sources.
**Always use:** Direct links when possible. Prefer sources from the last 5 years for treatment guidance.

### Medical Terminology Rules
- Write in plain English first, then medical term in parentheses on first use
- Example: "high blood pressure (hypertension)" not just "hypertension"
- Spell out all acronyms on first use
- Never use medical jargon without plain-language explanation

### Insurance Terminology
- **EOB** — Explanation of Benefits (summary of how a claim was processed)
- **Prior Authorization (PA)** — pre-approval required before coverage kicks in
- **Claim denial** — insurer refused to pay; has specific reason codes
- **Appeal** — formal request to reconsider a denial (levels: internal → external → state)
- **Network** — in-network (lower cost), out-of-network (higher or no coverage)
- **Deductible** — amount you pay before insurance covers costs
- **Copay** — fixed amount per visit/prescription
- **Coinsurance** — percentage you pay after deductible
- **OOPM** — Out-of-Pocket Maximum (yearly cap on your costs)

## Medication Evaluation Framework

When evaluating medications or interactions, always assess:

### Drug Interaction Severity Levels
| Level | Label | Action |
|-------|-------|--------|
| Contraindicated | 🚫 DO NOT COMBINE | Tell patient to contact doctor immediately |
| Major | 🔴 SERIOUS | Contact doctor before taking; may require dose adjustment |
| Moderate | 🟡 CAUTION | Monitor for symptoms; discuss with pharmacist |
| Minor | 🟢 LOW RISK | Generally safe; be aware of listed symptoms |
| Unknown | ⚪ UNKNOWN | Insufficient data; consult pharmacist |

### Standard Medication Info Block
For each medication mentioned, provide:
- Generic name and brand name(s)
- Drug class and mechanism (1 sentence, plain language)
- Common uses
- Common side effects (top 5)
- Serious side effects (when to call doctor immediately)
- Food interactions (especially grapefruit, alcohol, high-fat meals)
- Drug-drug interactions (using RxNorm API data)
- Source: OpenFDA / RxNorm links

## Provider Quality Metrics (from CMS data)

When scanning for providers, include:
- **NPI Verified** — confirmed active in NPPES registry
- **Board Certified** — specialty board certification status
- **Hospital Quality Rating** — CMS star rating (1-5 stars)
- **Patient Safety Grade** — Leapfrog Safety Grade (A-F)
- **Volume** — higher procedure volume = better outcomes for complex cases
- **Accepting New Patients** — verify via NPI record or clinic call
- **Network Status** — in-network vs. out-of-network flag

## Appointment Preparation Standards

Every appointment prep (modes/appointment.md) MUST include:
1. Visit purpose and context summary
2. Updated medication list to bring (from data/medications.md)
3. Specific questions for this appointment (8-12)
4. Recent symptoms or changes to report
5. Documents/records to bring
6. What tests or referrals to ask about
7. Insurance / billing reminders
8. What to do after the appointment (follow-up)

## Insurance Appeal Standards

Every insurance appeal letter MUST include:
- Patient demographics (name, DOB, member ID, group number)
- Date of service or denial date
- Claim or authorization number
- Procedure/diagnosis codes (CPT, ICD-10) if known
- Clear statement of what's being appealed and why
- Medical necessity argument with clinical evidence
- Cited peer-reviewed studies or clinical guidelines
- Physician support letter request (if applicable)
- Request for expedited review (if urgent)
- Deadline for response (check your state's law — typically 30-60 days)

## Second Opinion Triggers

Recommend second opinion (score 4-5) when:
- Diagnosis is rare, complex, or controversial
- Treatment plan involves major surgery
- Diagnosis is terminal or life-changing
- Multiple treatment options with significantly different outcomes
- Physician seems dismissive of symptoms
- Diagnosis took unusually long to reach
- Patient has not improved with treatment after reasonable time
- Prescribed off-label use of a medication

Recommend against second opinion (score 1-2) when:
- Diagnosis is straightforward and well-supported by test results
- Treatment is standard first-line care with broad consensus
- Patient is satisfied with explanation and understands options
- Patient's relationship with current provider is strong

## Red Flag Symptom Library

Always flag these symptom clusters for escalation:

**Cardiovascular:** Chest pain/pressure, irregular heartbeat, sudden shortness of breath, leg swelling, fainting
**Neurological:** Sudden severe headache, one-sided weakness/numbness, vision changes, speech difficulty, balance loss
**Infectious:** High fever + stiff neck + light sensitivity (meningitis), rapidly spreading redness/warmth (cellulitis), fever + new rash
**Gastrointestinal:** Bright red blood in stool, black tarry stool, severe abdominal pain + rigid abdomen, vomiting blood
**Respiratory:** Coughing blood, respiratory rate >30 breaths/min, SpO2 <92%
**Oncological:** Unexplained weight loss >10% in 6 months, night sweats, new palpable mass
**Psychiatric:** Active suicidal ideation with plan, acute psychosis, inability to care for self
