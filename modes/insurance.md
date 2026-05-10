# vitaops — Mode: Insurance Navigation
# Activated when: denial, prior auth, EOB analysis, claim appeal, coverage question

## Pre-flight

1. Read `modes/_shared.md` — insurance terminology, appeal standards
2. Read `modes/_profile.md` — insurance advocacy stance, threshold
3. Read `config/profile.yml` — full insurance details (carrier, member ID, plan type, appeals address)
4. Read `health-profile.md` — conditions and context
5. Read `config/providers.yml` — provider NPI and contact info for letters

## STEP 1 — Identify Insurance Situation

| Situation | Action |
|-----------|--------|
| Claim denied | Analyze denial reason, build appeal strategy |
| Prior authorization denied | PA appeal letter + medical necessity argument |
| Prior authorization needed (new) | Prep PA request package |
| EOB analysis | Decode and explain what patient owes |
| Coverage question | Explain what plan covers for specific situation |
| Out-of-network dispute | Surprise billing rights, balance billing protection |

## STEP 2 — Analyze the Denial (if applicable)

Ask for or have patient provide:
- Denial letter (date, claim number, reason code, stated reason)
- EOB (Explanation of Benefits) if received
- The service that was denied (procedure, test, medication, referral)
- Name of treating physician and their NPI

**Common Denial Reason Codes:**
| Code | Meaning | Appeal Strategy |
|------|---------|-----------------|
| CO-4 | Service requires pre-authorization | Document medical necessity; show urgency |
| CO-11 | Diagnosis inconsistent with procedure | Match CPT to ICD-10 correctly; get amended claim |
| CO-97 | Service included in another service billed | Request itemized bill; check bundling rules |
| CO-45 | Charges exceed fee schedule | Negotiate; this is often final |
| PR-1 | Deductible not met | Verify deductible balance; this may be correct |
| PR-2 | Coinsurance | This is your share — usually correct |
| N-130 | Prior authorization not obtained | Medical necessity appeal; ask for retroactive auth |
| N-362 | Experimental/investigational | Cite peer-reviewed evidence that it's standard of care |

## STEP 3 — Determine Appeal Level

| Level | Who Handles | Timeline | When to Use |
|-------|-------------|----------|-------------|
| 1st Internal Appeal | Insurer's appeal dept | 30-60 days (7-72h if urgent) | Always start here |
| 2nd Internal Appeal | Senior review committee | 30 days | If first appeal denied |
| External Review | Independent Organization (IRO) | 45 days | After exhausting internal appeals |
| State Insurance Commissioner | State regulatory body | Varies | Insurer violated state law |
| Federal Complaint | CMS, DOL, or HHS | Varies | ERISA plans or ACA violations |
| Patient Advocate | Certified patient advocate | N/A | Complex cases, attorney-level support |

**Expedited review triggers (7-72h decision):**
- Condition is life-threatening
- Hospital discharge being delayed by denial
- Treatment needed urgently

## STEP 4 — Generate Insurance Report & Letter

Create report: `reports/{###}-insurance-{slug}-{YYYY-MM-DD}.md`

```markdown
# Insurance Navigation Report: {Situation}

**Report:** #{###} | **Date:** {YYYY-MM-DD}
**Patient:** {name} | **Member ID:** {id} | **Plan:** {plan name}
**Insurer:** {carrier} | **Denial Date:** {date if applicable}

---

## Situation Summary

| Field | Details |
|-------|---------|
| Denied Service | {description of what was denied} |
| Denial Reason | {stated reason + code} |
| Date of Service | {date} |
| Claim Number | {number} |
| Appeal Deadline | {deadline — typically 180 days from denial} |
| Recommended Path | {appeal level + rationale} |
| Insurance Risk Score | {1-5} |

---

## Your Rights

{Relevant patient rights for this specific situation}

**Key protections that apply:**
- **ACA Protections:** {applicable ACA consumer protections}
- **State Law:** {check your state's patient rights law — varies by state}
- **No Surprises Act (2022):** {if balance billing / out-of-network situation}
- **ERISA:** {if employer-sponsored plan — different rules apply}

---

## Appeal Strategy

**Winning arguments for this denial:**
1. {Primary medical necessity argument}
2. {Clinical guideline support — cite specific guideline}
3. {Patient-specific factor that makes this medically necessary}
4. {Precedent: similar services that were covered}

**Evidence to gather before submitting:**
- [ ] Letter of medical necessity from {Dr. Name}
- [ ] Peer-reviewed studies supporting this treatment
- [ ] Clinical guidelines from {relevant specialty society}
- [ ] Documentation of failed alternative treatments
- [ ] {Any other case-specific evidence}

---

## Appeal Timeline

| Day | Action | Responsible Party |
|-----|--------|-------------------|
| Today | Submit 1st level internal appeal | You |
| +3 days | Follow up to confirm receipt | You |
| +30 days | Decision expected by | Insurer |
| +35 days | If no decision, escalate to 2nd level | You |
| +60 days | If denied again, file external review | You |

---
```

Then generate the actual appeal letter in the same file:

```markdown
---

# APPEAL LETTER

---

[Your Name]
[Address]
[City, State, ZIP]
[Phone]
[Email]

{Date}

Appeals Department
{Insurance Company Name}
{Appeals Address from profile}

**RE: Appeal of Claim Denial**
**Patient Name:** {name}
**Date of Birth:** {DOB}
**Member ID:** {member ID}
**Group Number:** {group number}
**Claim / Authorization Number:** {number}
**Date of Service:** {date}
**Denied Service:** {description}
**Denial Reason:** {stated reason}

Dear Appeals Department,

I am writing to formally appeal the denial of {service/medication/procedure} on {date of denial}. I believe this denial is incorrect based on medical necessity and [the clinical evidence below / applicable plan provisions / state law].

**Treating Physician:** {Doctor name}, {credentials}, NPI: {NPI number}
**Diagnosis:** {ICD-10 code} — {plain language condition name}
**Requested Service:** {CPT code if known} — {description}

**Medical Necessity**

{2-3 paragraph clinical justification tailored to the denial reason. Include:
- Why this specific treatment is necessary for this patient
- Why alternatives are not appropriate or were tried and failed
- Clinical guidelines supporting this treatment
- Patient-specific factors}

**Supporting Evidence**

The following peer-reviewed clinical guidelines and studies support the medical necessity of this treatment:

1. {Clinical guideline citation — e.g., "American Diabetes Association Standards of Care (2025) recommends [X] for patients with [condition]"}
2. {PubMed study citation — include PMID}
3. {Any additional supporting evidence}

**Requested Resolution**

I respectfully request that you:
1. Reverse the denial and authorize/reimburse {service}
2. Provide expedited review given {reason if urgent}
3. Provide written confirmation of your decision within 30 days

If you uphold the denial, please provide:
- The specific clinical criteria used in your determination
- The name and credentials of the reviewing physician
- Information on how to request an external review

I am prepared to escalate this matter to an Independent Review Organization and to the [State] Department of Insurance if this appeal is not resolved in my favor.

Thank you for your prompt attention.

Sincerely,

{Patient Name}
{Date}

**Enclosures:**
- Letter of medical necessity from {Dr. Name} (requested)
- Supporting clinical studies
- Copy of original denial letter
- {Any other enclosures}

---
```

## STEP 5 — Save and Summarize

Save full report + letter to `reports/{###}-insurance-{slug}-{YYYY-MM-DD}.md`
Save letter only to `output/{###}-letter-appeal-{slug}-{YYYY-MM-DD}.md`

Update `data/pipeline.md`:
```
- [ ] Submit appeal for {service} — deadline {date} | Status: Letter ready | [report link]
```

## STEP 6 — Offer Next Steps

- "Would you like me to write the Letter of Medical Necessity request to your doctor?"
- "Should I research additional clinical studies supporting this treatment?"
- "Would you like guidance on how to file an external review if this appeal is denied?"
- "Do you want me to check your state's specific patient appeal rights?"
