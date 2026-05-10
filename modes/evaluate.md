# vitaops — Mode: Evaluate
# Activated when: new diagnosis, test results, symptoms described, health situation to assess

## Pre-flight

1. Read `modes/_shared.md` — evaluation standards, urgency scale, source hierarchy
2. Read `modes/_profile.md` — patient's priorities, communication style, red flags
3. Read `health-profile.md` — existing conditions, allergies, medications, family history
4. Read `config/profile.yml` — patient demographics
5. Read `data/medications.md` — current medications (for interaction context)

## STEP 0 — Emergency Screen

Before any evaluation, scan for emergency symptoms from AGENTS.md emergency list.
If any present → activate Emergency Protocol immediately. STOP evaluation.

## STEP 1 — Gather Context

If situation is unclear, ask up to 3 focused questions:
- "What specifically are you trying to understand about [condition/symptom]?"
- "Has a doctor already diagnosed this, or are you trying to understand symptoms?"
- "How long have you had this, and is it getting better, worse, or staying the same?"

Do NOT ask unnecessary questions if context is already clear.

## STEP 2 — Urgency Assessment

Assign urgency level (1-5) from _shared.md scale.

If level 4 or 5:
- Immediately display urgency banner before continuing
- Recommend appropriate level of care (urgent care vs. ER vs. call 911)
- Still complete evaluation (so user has information when they arrive)

## STEP 3 — Generate Evaluation Report

Create report file: `reports/{next_num}-eval-{slug}-{YYYY-MM-DD}.md`

### Report Structure:

```markdown
# Evaluation Report: {Condition/Concern}

**Report:** #{###} | **Date:** {YYYY-MM-DD} | **Urgency:** {Level + Label}
**Patient:** {name from profile} | **Prepared by:** vitaops

---

## A) Situation Summary

| Field | Assessment |
|-------|------------|
| Condition / Concern | {plain language description} |
| Urgency | {1-5 scale + label} |
| Time Sensitivity | Immediate / Within days / Within weeks / Monitor |
| Specialist Recommended | {specialty or "No — primary care is appropriate"} |
| Related to Existing Conditions | {Yes — [condition] / No / Possibly} |

---

## B) Understanding This Condition

### What Is It?
{2-3 paragraph plain-language explanation. Introduce medical terms in parentheses on first use.}

### What Causes It?
{Risk factors, triggers, mechanisms — plain language}

### What the Research Says
{Current medical consensus. Cite 2-3 sources. Note any ongoing debates in the medical community.}

### What This Is NOT
{Address the most common fears and misconceptions. Reduce anxiety where evidence supports it.}

---

## C) Questions for Your Doctor

Print this list and bring it to your appointment.

**About the Diagnosis:**
1. How confident are you in this diagnosis? What else could it be?
2. What tests confirm or rule out this diagnosis?
3. Is this a chronic (long-term) or acute (short-term) condition?

**About Treatment:**
4. What are all the treatment options? What are the trade-offs of each?
5. What is the first-line treatment and why?
6. Are there generic medications available for this?
7. What happens if we choose watchful waiting instead of treating immediately?

**About My Specific Situation:**
8. {Personalized question based on their existing conditions}
9. {Personalized question based on medications}

**About Prognosis:**
10. What is the likely outcome with treatment? Without treatment?
11. What lifestyle changes would make the biggest difference?

**Red Flags:**
12. What symptoms should make me call you immediately?
13. When should I go to the emergency room?

**Next Steps:**
14. What specialist should I see, and how do I get a referral?
15. Would you recommend I get a second opinion given the complexity?

---

## D) Action Plan

| Timeframe | Action | Priority | Notes |
|-----------|--------|----------|-------|
| Today | {action} | 🔴 High | {detail} |
| Within 48 hours | {action} | 🔴 High | {detail} |
| Within 1 week | {action} | 🟡 Medium | {detail} |
| Within 1 month | {action} | 🟡 Medium | {detail} |
| Ongoing | {action} | 🟢 Low | {detail} |

---

## E) Patient Advocacy

### Your Rights
{Relevant patient rights for this situation: right to explanation, right to records, right to second opinion, etc.}

### Insurance Considerations
- **Typically covered:** {what's usually covered for this condition}
- **Common denial triggers:** {what insurers often push back on and why}
- **Prior authorization likely for:** {treatments/tests that usually need PA}
- **Insurance Risk Score:** {1-5} — {reasoning}

### Second Opinion Recommendation
**Score: {1-5}/5** — {Strongly recommended / Recommended / Optional / Not necessary}

{Reasoning: why a second opinion is or isn't warranted here}

{If recommended: "Consider seeking a second opinion from a {specialty} at an academic medical center. To request one, use modes/second-opinion.md."}

---

## F) Research Summary

| Source | Key Finding | Date | Link |
|--------|-------------|------|------|
| {NIH/PubMed} | {finding} | {year} | {url} |
| {Clinical guideline} | {recommendation} | {year} | {url} |
| {Review article} | {finding} | {year} | {url} |

### Patient Resources
- **Advocacy Organization:** {relevant patient advocacy org for this condition}
- **Clinical Trials:** Search clinicaltrials.gov for "{condition name}" if standard treatments haven't worked
- **Support Groups:** {if relevant}

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Always consult your doctor before making health decisions.*
```

## STEP 4 — Update Tracker

Add entry to `data/health-log.md`:
```
| {###} | {date} | {category} | {condition} | {provider if known} | Active | [report link] | {brief notes} |
```

## STEP 5 — Update Pipeline

Add relevant action items to `data/pipeline.md` under appropriate priority section.

## STEP 6 — Offer Next Steps

After delivering the report, offer:
1. "Would you like me to prepare questions for an upcoming appointment? (use: appointment mode)"
2. "Should I check if any of your current medications interact with treatments for this condition? (use: medication mode)"
3. "Would you like me to find specialists for this condition in your area? (use: scan mode)"
4. "Should I check what your insurance typically covers for this? (use: insurance mode)"
