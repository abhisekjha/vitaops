# vitaops — Mode: Provider Scan
# Activated when: finding a doctor, specialist search, hospital research

## Pre-flight

1. Read `modes/_shared.md` — provider quality metrics
2. Read `modes/_profile.md` — patient care philosophy
3. Read `config/profile.yml` — insurance plan type, in-network requirements
4. Read `config/providers.yml` — existing care team (avoid duplicates)
5. Read `health-profile.md` — conditions (for specialty matching)

## STEP 1 — Gather Search Parameters

Ask if not provided:
- What specialty are you looking for?
- What city/area? (ZIP code preferred for radius search)
- Do you need in-network with your specific plan?
- Any requirements? (e.g., evening hours, female physician, speaks Spanish, telehealth)
- What condition do you need to manage? (helps match sub-specialty)
- New patient or existing patient?

## STEP 2 — Run Provider Search

```bash
node scripts/find-providers.mjs --specialty "{specialty}" --city "{city}" --state "{state}" --zip "{zip}"
```

This script queries:
1. **NPPES NPI Registry** — All active licensed providers by specialty + location
2. **CMS Provider Data** — Quality ratings, patient outcomes, hospital affiliations
3. **CMS Hospital Compare** — In-network hospital quality stars

## STEP 3 — Generate Provider Scan Report

Create report: `reports/{###}-scan-{specialty-slug}-{city-slug}-{YYYY-MM-DD}.md`

```markdown
# Provider Scan: {Specialty} in {City, State}

**Report:** #{###} | **Date:** {YYYY-MM-DD}
**Patient:** {name} | **Insurance:** {plan} | **In-Network Required:** {yes/no}

---

## Search Parameters

| Field | Value |
|-------|-------|
| Specialty | {specialty} |
| Location | {city, state} ({radius} mile radius) |
| Condition | {condition being managed} |
| In-Network | {carrier, plan type} |
| Requirements | {any special requirements} |

---

## Top Providers Found

*(Sorted by: CMS quality score, then patient volume, then proximity)*

---

### 1. Dr. {Name}, {Credentials}
**Specialty:** {specialty} | **Sub-specialty:** {sub-specialty if relevant}
**Clinic:** {clinic name}
**Address:** {address} | **Distance:** {miles} from {your location}
**Phone:** {phone} | **Website:** {url}

| Quality Metric | Score | Source |
|----------------|-------|--------|
| NPI Status | Active ✅ | NPPES |
| Board Certified | Yes / No | ABMS |
| Hospital Affiliation | {hospital name} ({CMS star rating}★) | CMS |
| Patient Volume | {high/medium/low} for this procedure | CMS |
| Medicare Acceptance | {yes/no} | CMS |
| Accepting New Patients | {yes/no/unknown — call to verify} | Clinic |
| In-Network with {your plan} | {yes/no/verify} | Insurer |

**Why this provider:** {1-2 sentences on why this provider ranks highly for this patient's specific situation}

**Call script:** "Hi, I'm a new patient looking for a {specialty} who accepts {insurance carrier}. Is Dr. {Name} accepting new patients and in-network with {plan name}?"

---

### 2. Dr. {Name}, {Credentials}
*(repeat structure)*

---

### 3. Dr. {Name}, {Credentials}
*(repeat structure)*

---

## Academic Medical Centers (for complex cases)

If this condition warrants subspecialty expertise at an academic center:

| Center | Specialty Program | Location | Ranking |
|--------|-------------------|----------|---------|
| {UCSF / Johns Hopkins / Mayo / Cleveland Clinic / etc.} | {specialty program name} | {city} | {US News ranking if known} |

---

## Red Flags to Watch For

When calling or meeting a new provider:
- ❌ Can't explain your condition clearly in plain language
- ❌ Dismisses your questions or symptoms without explanation
- ❌ Refuses to share test results or explain numbers
- ❌ Doesn't ask about your other medications or conditions
- ❌ Pressures you into immediate decisions without time to think
- ❌ Not board-certified in their specialty
- ❌ Has disciplinary actions (check: your state medical board website)

**How to check disciplinary actions:** Visit [your state] Medical Board website → "Physician Lookup" → search by name

---

## Questions to Ask a New Provider

First appointment questions:
1. Are you taking new patients with my insurance plan?
2. What is your experience with [specific condition]? How many patients do you treat with this?
3. What is your philosophy on [treatment approach relevant to condition]?
4. How do you prefer patients to contact you between appointments?
5. What hospital are you affiliated with, and is it in-network with my plan?
6. Do you have telehealth options?

---

## Next Steps

To add a chosen provider to your care team:
1. Call to confirm they're accepting new patients and in-network
2. Request a "new patient appointment" — bring your health history
3. After first appointment, I'll add them to `config/providers.yml`

---

*⚕️ This is health information to support your conversations with your healthcare providers — not medical advice. Always consult your doctor before making health decisions.*
```

## STEP 4 — Update Pipeline

```
- [ ] Call Dr. {Name} to verify new patient acceptance — {phone} | [scan report]
```

## STEP 5 — Offer to Prep for First Appointment

"Once you've booked with a new provider, run appointment mode and I'll prepare you for your first visit."
