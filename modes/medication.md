# vitaops — Mode: Medication Management
# Activated when: drug interaction check, medication questions, side effects, new prescription

## Pre-flight

1. Read `modes/_shared.md` — interaction severity levels, medication evaluation framework
2. Read `modes/_profile.md` — patient preferences on medications
3. Read `data/medications.md` — current full medication list
4. Read `health-profile.md` — conditions, allergies
5. Read `config/profile.yml` — insurance (for generic/cost questions)

## STEP 1 — Identify Request Type

| Request | Action |
|---------|--------|
| "Check my medications for interactions" | Run full interaction check on all current meds |
| "Can I take X with Y?" | Check interaction between those two drugs |
| "New prescription — is this safe?" | Add to list, check interactions, explain drug |
| "Side effects of X?" | Research and explain via OpenFDA + RxNorm |
| "Is there a generic for X?" | Look up generic equivalents, cost comparison |
| "I want to stop taking X" | Explain stopping protocol, recommend talking to doctor |

## STEP 2 — Drug Interaction Check

Run: `node scripts/check-interactions.mjs "{drug1}" "{drug2}" ...`

The script queries the RxNorm Interaction API and returns severity levels.

If script unavailable, manually use:
```
https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis={rxcui1}+{rxcui2}
```

To get RxCUI for a drug:
```
https://rxnav.nlm.nih.gov/REST/drugs.json?name={drug_name}
```

## STEP 3 — Generate Medication Report

Create report: `reports/{###}-medication-{slug}-{YYYY-MM-DD}.md`

```markdown
# Medication Report: {title}

**Report:** #{###} | **Date:** {YYYY-MM-DD}
**Patient:** {name} | **Prepared by:** vitaops

---

## Current Medication List

| # | Medication | Generic Name | Dose | Frequency | Prescribing MD | Condition | Start Date |
|---|------------|--------------|------|-----------|----------------|-----------|------------|
| 1 | {Brand} | {generic} | {dose} | {frequency} | {doctor} | {condition} | {date} |

---

## Interaction Analysis

### {Drug A} × {Drug B}
**Severity:** {level + emoji from _shared.md}
**Mechanism:** {how the interaction works — 1 sentence}
**Clinical effect:** {what happens in the patient}
**Action required:** {specific next step}
**Source:** {RxNorm / OpenFDA / clinical reference}

*(Repeat for each interaction pair)*

---

## Interaction Summary

| Drug A | Drug B | Severity | Action |
|--------|--------|----------|--------|
| {med} | {med} | 🔴 Major | Contact prescriber |
| {med} | {med} | 🟡 Moderate | Monitor for {symptoms} |
| {med} | {med} | 🟢 Minor | Be aware of {symptoms} |

**🚨 Contraindicated combinations (MUST address):**
{List any do-not-combine interactions with urgency}

---

## Drug Profile: {Medication Name}

*(Include for each medication being evaluated)*

**Generic Name:** {name}
**Brand Name(s):** {names}
**Drug Class:** {class} — {plain language: what type of drug this is}
**How It Works:** {mechanism in 1-2 sentences, plain language}
**Used For:** {indications}

### Common Side Effects (>10% of patients)
- {side effect} — usually {severity and duration}
- {side effect}
- {side effect}

### Serious Side Effects — Call Your Doctor If:
- {symptom} — may indicate {concern}
- {symptom}

### When to Go to the ER
- {emergency symptom} — could indicate {serious reaction}

### Food & Drink Interactions
- **Grapefruit:** {avoid / no issue / caution}
- **Alcohol:** {avoid / limit / no issue}
- **High-fat meals:** {take with food / take on empty stomach / no effect}
- **Other:** {specific foods to avoid}

### Timing & Storage
- **Best time to take:** {morning/evening/with food/etc.}
- **Storage:** {room temperature / refrigerate / keep from light}
- **Missed dose:** {what to do — drug-specific guidance}
- **Do NOT:** {common mistake to avoid}

### Generic Alternatives
| Generic Name | Typical Cost (30-day) | Notes |
|---|---|---|
| {name} | ${estimate} | {any differences from brand} |

**Patient Assistance:** If cost is a concern, check:
- NeedyMeds.org
- RxAssist.org
- Manufacturer's patient assistance program: {link if known}

---

## Allergy Check

{Cross-reference with patient's known allergies from health-profile.md}
{Flag any medications in the same drug class as known allergens}

**Potential Cross-Reactivity:**
- {allergy} → watch for {related drug classes}

---

## Recommendations

Based on the interaction analysis:

1. {Specific action — e.g., "Contact Dr. Smith about the Warfarin × Aspirin interaction"}
2. {Specific action}
3. {Specific action}

**Questions to ask your pharmacist or doctor:**
1. {Targeted question about a specific concern}
2. {Timing optimization question}
3. {Generic substitution question if applicable}

---

## Sources

| Source | Finding | URL |
|--------|---------|-----|
| RxNorm Interaction API | {interaction finding} | rxnav.nlm.nih.gov |
| OpenFDA | {adverse event data} | api.fda.gov |
| {Clinical source} | {guideline or study} | {url} |

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Never stop or change medications without consulting your doctor or pharmacist.*
```

## STEP 4 — Update Medications List

If new medication discussed or changes noted, update `data/medications.md`.
If stopped medication, mark as inactive (do not delete — keep history).

## STEP 5 — Flag Urgent Interactions

If any contraindicated or Major severity interactions found:
- Add to top of `data/pipeline.md` under 🔴 Urgent
- Clearly communicate: "This interaction should be discussed with your prescribing doctor before your next dose"
- Offer to generate a letter to the prescribing physician about the concern
