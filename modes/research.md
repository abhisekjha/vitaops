# vitaops — Mode: Medical Research
# Activated when: researching a condition, treatment, medication, or procedure

## Pre-flight

1. Read `modes/_shared.md` — source hierarchy, terminology rules
2. Read `modes/_profile.md` — detail level preference, communication style
3. Read `health-profile.md` — existing conditions (for context and contraindications)
4. Read `data/medications.md` — current meds (for interaction context)

## STEP 1 — Clarify Research Scope

If not clear from context:
- What specifically do you want to research? (condition / treatment / medication / test / procedure)
- Is this for: understanding your own diagnosis | evaluating a treatment option | preparing for an appointment | general interest?
- What do you already know? (calibrates depth of explanation)
- Is there a specific aspect you're most concerned about?

## STEP 2 — Run Research

Query sources in order of evidence quality (from _shared.md source hierarchy).
For treatment research: prioritize systematic reviews and RCTs.
For condition research: use clinical practice guidelines + NIH resources.
For medication research: OpenFDA + RxNorm + clinical pharmacology references.

**Free APIs to query:**
```
PubMed: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term={query}+[title/abstract]&retmax=10&sort=relevance&format=json
ClinicalTrials: https://clinicaltrials.gov/api/v2/studies?query.cond={condition}&aggFilters=status:rec&pageSize=5
```

## STEP 3 — Generate Research Report

Create report: `reports/{###}-research-{slug}-{YYYY-MM-DD}.md`

```markdown
# Research Report: {Topic}

**Report:** #{###} | **Date:** {YYYY-MM-DD}
**Patient:** {name} | **Research Type:** {condition/treatment/medication/procedure}
**Evidence Quality:** {summary of evidence quality found}

---

## Plain Language Summary

{3-5 paragraph overview written for an intelligent non-specialist. Use the rule: explain it like you're talking to a smart friend who isn't a doctor. Medical terms in parentheses on first use.}

---

## What the Evidence Says

### Level 1: Systematic Reviews & Meta-analyses
*(Highest quality evidence — combines results of many studies)*

| Study | Key Finding | Date | Confidence |
|-------|-------------|------|------------|
| {citation} | {finding in plain language} | {year} | {High/Moderate/Low} |

### Level 2: Randomized Controlled Trials
*(Gold standard for treatment effectiveness)*

| Study | Intervention | Finding | Limitations |
|-------|-------------|---------|-------------|
| {citation} | {treatment tested} | {outcome} | {limitation} |

### Level 3: Clinical Guidelines
*(What expert panels recommend based on evidence)*

| Organization | Recommendation | Strength | Year |
|---|---|---|---|
| {ADA / AHA / NCCN / etc.} | {specific recommendation} | Strong / Moderate / Weak | {year} |

### Ongoing Research & Clinical Trials
*(What's being studied now — not yet proven but promising)*

| Trial | Phase | What's Being Tested | Status | Location |
|-------|-------|---------------------|--------|----------|
| {NCT number + title} | Phase {I/II/III} | {description} | Recruiting | {sites} |

*Source: ClinicalTrials.gov — talk to your doctor if interested in participating*

---

## What's Controversial or Uncertain

{Be honest about gaps in evidence. What do doctors disagree on? What doesn't the research answer?}

**Areas of active debate:**
- {controversy 1 — explain both sides fairly}
- {controversy 2}

**What we don't know yet:**
- {knowledge gap}
- {ongoing question}

---

## Practical Implications for Your Situation

*Based on your health profile and current conditions:*

| Your Factor | Relevance |
|-------------|-----------|
| {existing condition} | {how this affects the research findings for you} |
| {current medication} | {interaction or consideration} |
| {age/sex/lifestyle factor} | {how this affects the evidence} |

---

## Questions the Research Raises for Your Doctor

Based on this evidence, these are the most important questions to bring to your provider:

1. {Evidence-informed question: "The ADA guidelines recommend X — is that appropriate for my situation?"}
2. {Gap question: "I read that there are conflicting results on Y — how do you think about that?"}
3. {Clinical trial question if relevant: "Am I a candidate for this clinical trial?"}
4. {Personalization question: "Given [your specific factor], does the evidence apply to me?"}

---

## Patient Resources

| Resource | What It Offers | URL |
|----------|---------------|-----|
| {Condition advocacy organization} | Patient guides, support community | {url} |
| {NIH resource} | Clinical information | {url} |
| {Research registry / patient registry} | Contribute to research | {url} |

---

## Sources

All sources accessed {date}. Prioritized by evidence quality.

1. {Full citation — Author, Title, Journal, Year, DOI/PMID}
2. {Full citation}
3. {Full citation}
4. {Guideline citation — Organization, Title, Version, Year, URL}
5. {Additional source}

---

**Evidence Quality Summary:** {Overall: High / Moderate / Low / Insufficient}
{One sentence explaining why: e.g., "Treatment is backed by multiple large RCTs and major society guidelines" or "Evidence is mostly observational; large RCTs are lacking"}

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Always consult your doctor before making health decisions.*
```

## STEP 4 — Log to Tracker

Add to `data/health-log.md` under Research category.

## STEP 5 — Offer Next Steps

- "Would you like me to turn these research findings into questions for your next appointment?"
- "Should I look up clinical trials that may be relevant to your situation?"
- "Would you like me to research the specific treatment options mentioned in these studies?"
