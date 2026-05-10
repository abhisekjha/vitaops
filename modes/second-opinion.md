# vitaops — Mode: Second Opinion
# Activated when: patient wants a second opinion on diagnosis or treatment plan

## Pre-flight

1. Read `modes/_shared.md` — second opinion triggers, scoring
2. Read `modes/_profile.md` — patient preferences
3. Read `health-profile.md` — full medical history
4. Read `config/profile.yml` — insurance, location
5. Read most recent evaluation report if one exists

## STEP 1 — Assess Second Opinion Need

Score the second opinion recommendation (1-5) based on _shared.md criteria.

**Scoring:**
- 5 (Strongly recommend): Rare condition, major surgery, terminal diagnosis, conflicting opinions
- 4 (Recommend): Complex treatment plan, patient unsure, condition not improving
- 3 (Consider): Reasonable either way, patient's peace of mind is valid
- 2 (Optional): Diagnosis is clear-cut, treatment is standard
- 1 (Not necessary): Simple, well-established condition with obvious treatment

## STEP 2 — Generate Second Opinion Report

```markdown
# Second Opinion Guide: {Condition/Situation}

**Report:** #{###} | **Date:** {YYYY-MM-DD}
**Patient:** {name} | **Second Opinion Score:** {score}/5

---

## Should You Get a Second Opinion?

**Recommendation: {Strongly Recommended / Recommended / Optional / Not Necessary}**
**Score: {score}/5**

**Reasons for this recommendation:**
{Bullet points from _shared.md triggers that apply to this case}

**There is never anything wrong with getting a second opinion.** It is your right as a patient. Most physicians support it — and if yours doesn't, that itself is a red flag.

---

## What a Second Opinion Can Tell You

- Confirm the diagnosis is correct
- Reveal if alternative diagnoses were missed
- Offer different treatment approaches
- Validate that the recommended treatment is standard of care
- Give you confidence to proceed — or pause — with the plan

---

## How to Get a Second Opinion

### Step 1: Request Your Records
You need these before seeing a new doctor:
- [ ] All imaging with the actual images (not just the report)
- [ ] All lab results (actual values, not just "normal")
- [ ] Pathology reports (if applicable)
- [ ] Consultation notes from your current specialist
- [ ] Operative reports (if surgery was done)

Use `advocate mode` to generate a medical records request letter.

### Step 2: Choose Where to Get Your Second Opinion

**For complex or serious conditions:**
| Type | Advantage | Best For |
|------|-----------|----------|
| Academic Medical Center | Access to specialists, latest research | Rare conditions, cancer, complex surgery |
| Major specialty center | Disease-specific expertise | Specific conditions (e.g., Cleveland Clinic for cardiac, MD Anderson for cancer) |
| Different physician, same specialty | Quick alternative view | Straightforward situations |
| Subspecialist | More focused expertise | When generalist made a diagnosis outside their focus |

**Top Academic Centers by Specialty:**
{Tailor to the specific condition being evaluated}
- Cancer: MD Anderson, Memorial Sloan Kettering, Mayo Clinic Cancer Center
- Cardiac: Cleveland Clinic, Mayo Clinic, Mass General
- Neurology: Johns Hopkins, Mayo Clinic, UCSF
- Rare diseases: NIH Clinical Center (Bethesda, MD) — free evaluation for rare diseases
- Pediatrics: Children's Hospital of Philadelphia, Boston Children's, Cincinnati Children's

### Step 3: Insurance Considerations
- Most plans cover second opinions — call your insurer to confirm
- Ask if the second opinion physician is in-network
- If out-of-network: ask your insurer about out-of-network benefits or exceptions for complex cases
- Academic centers often have dedicated insurance navigators

### Step 4: Prepare for the Second Opinion Appointment

Tell the new doctor:
- "I've been diagnosed with [condition] and given a treatment recommendation of [X]. I want your independent assessment."
- Do NOT tell them what the first doctor said initially — get their fresh assessment first, then compare
- Bring ALL records listed in Step 1
- Use `appointment mode` to prepare full question list

---

## Second Opinion Questions to Ask

**About the Diagnosis:**
1. Based on my records, do you agree with the diagnosis of [condition]?
2. What other diagnoses did you consider and why did you rule them out?
3. Are there any tests you would order that haven't been done?

**About the Treatment Plan:**
4. Do you agree with the recommended treatment of [X]?
5. What would you do differently?
6. Are there less aggressive options to consider first?
7. What's the risk of waiting 30-60 days before deciding?

**About Your Prognosis:**
8. What does the outcome look like with vs. without treatment?
9. What is the success rate of the recommended treatment at your center specifically?
10. What are the potential long-term side effects or complications?

---

## What to Do With Two Different Opinions

**If they agree:** You can proceed with confidence.

**If they disagree:** This is valuable information, not a problem.
- Don't panic — disagreement is common, especially in complex cases
- Ask both doctors to explain the clinical basis for their recommendation
- Consider a third opinion or going to an academic center
- Ask: "If you could not treat me, where would you send me?"
- The decision is ultimately yours — you are informed by both opinions

**Common reasons opinions differ:**
- Different interpretation of imaging or pathology
- Different familiarity with new treatment approaches
- Different surgical volumes and techniques
- Different philosophies (watchful waiting vs. intervention)
- Regional practice variation

---

## Referral Letter

Would you like me to write a referral letter to share with the second opinion physician? (use: advocate mode → secondopinion letter)

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Always consult your doctor before making health decisions.*
```

## STEP 3 — Log and Pipeline

Add to `data/health-log.md` under "Second Opinion" category.
Add to `data/pipeline.md`:
```
- [ ] Get records from {Dr. Name} for second opinion | [use advocate mode]
- [ ] Book second opinion at {recommended center/type} | Insurance: {in-network? verify}
```
