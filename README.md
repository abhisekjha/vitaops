# vitaops

**AI-Powered Personal Health Advocacy Agent**

> Turn any AI coding CLI into a complete health command center. Walk into every doctor's appointment prepared. Never let an insurance denial stand without a fight. Understand what your diagnosis actually means — in plain English.

---

## What vitaops does

| Mode | What it does |
|------|-------------|
| **evaluate** | Deep-dives any diagnosis, test result, or symptom with evidence-based research and plain-language explanation |
| **appointment** | Prepares you for any doctor visit — questions to ask, documents to bring, red flags to report |
| **medication** | Checks drug interactions (RxNorm API), explains side effects, finds generic alternatives |
| **insurance** | Decodes denial letters, writes insurance appeal letters, explains your rights |
| **research** | Summarizes peer-reviewed evidence on conditions, treatments, and medications |
| **scan** | Finds and evaluates specialists using NPPES + CMS quality data (free) |
| **second-opinion** | Guides you on when and how to get a second opinion |
| **advocate** | Writes professional medical letters: records requests, referrals, medical necessity letters |

## What vitaops does NOT do

- ❌ Diagnose conditions — only licensed physicians can diagnose
- ❌ Recommend specific dosages — that's your doctor's job
- ❌ Replace your doctor — it helps you work better with them
- ❌ Store your data in the cloud — everything stays on your machine

---

## Philosophy

Healthcare is designed with an asymmetry problem: your doctor knows 10 years of training's worth more than you do about your condition. vitaops closes that gap — not by replacing your doctor, but by making you a better-informed, more prepared, and more effective patient.

The system processes information and drafts advocacy materials. You review everything. You decide. Your doctor treats.

**Human-in-the-loop. Always.**

---

## Setup

### Prerequisites
- Node.js 18+
- Claude Code (or Gemini CLI, OpenCode, or any AI agent CLI)

### Install

```bash
git clone https://github.com/yourusername/vitaops
cd vitaops
npm install
node scripts/doctor.mjs   # Check setup
```

### First-run setup

Open Claude Code in this directory:
```bash
claude
```

On first run, vitaops will guide you through creating:
1. `health-profile.md` — your health history
2. `config/profile.yml` — your identity and insurance details
3. `config/providers.yml` — your care team
4. `modes/_profile.md` — your advocacy preferences
5. `data/medications.md` — your current medications

---

## Usage

Open Claude Code (or your AI CLI) in the vitaops directory and talk naturally:

```
"I was just diagnosed with Type 2 Diabetes. Help me understand what this means."
→ evaluate mode

"I have an appointment with my endocrinologist next Tuesday."
→ appointment mode

"Can I take ibuprofen with my blood pressure medication?"
→ medication mode

"My insurance denied my MRI. What do I do?"
→ insurance mode (generates appeal letter)

"Find me a rheumatologist in San Francisco who takes Blue Cross."
→ scan mode

"I want a second opinion on my surgery recommendation."
→ second-opinion mode

"Write a letter requesting my medical records from Dr. Smith."
→ advocate mode
```

---

## Command Line Tools

```bash
# Check drug interactions (free, no API key)
node scripts/check-interactions.mjs "metformin" "lisinopril" "aspirin"

# Find providers by specialty + location
node scripts/find-providers.mjs --specialty "endocrinology" --city "San Francisco" --state "CA"

# Validate your setup
npm run doctor

# Check for system updates
npm run update:check
```

---

## Data Architecture

```
vitaops/
├── CLAUDE.md                    # Claude Code entry point
├── AGENTS.md                    # Complete agent specification
├── health-profile.md            # Your health history (gitignored)
├── config/
│   ├── profile.yml              # Your identity + insurance (gitignored)
│   └── providers.yml            # Your care team (gitignored)
├── modes/
│   ├── _shared.md               # System logic (auto-updatable)
│   ├── _profile.md              # YOUR preferences (never touched)
│   ├── evaluate.md              # Diagnosis/symptom evaluation
│   ├── appointment.md           # Appointment preparation
│   ├── medication.md            # Medication management
│   ├── insurance.md             # Insurance navigation
│   ├── research.md              # Medical research
│   ├── scan.md                  # Provider search
│   ├── second-opinion.md        # Second opinion guidance
│   └── advocate.md              # Letter generation
├── data/                        # Your tracking data (gitignored)
│   ├── health-log.md
│   ├── medications.md
│   ├── appointments.md
│   └── pipeline.md
├── reports/                     # Evaluation reports (gitignored)
├── output/                      # Generated letters (gitignored)
├── templates/                   # Letter and config templates
└── scripts/                     # Automation tools
    ├── check-interactions.mjs   # RxNorm drug interaction API
    ├── find-providers.mjs       # NPPES + CMS provider search
    ├── doctor.mjs               # Setup validator
    └── update-system.mjs        # System updater
```

**Two-layer data separation:**
- **User layer** (your data, never auto-updated): `health-profile.md`, `config/profile.yml`, `config/providers.yml`, `modes/_profile.md`, `data/*`, `reports/*`, `output/*`
- **System layer** (auto-updatable): `modes/_shared.md`, `templates/*`, `scripts/*`, `AGENTS.md`

---

## Free APIs Used

| API | Data | Cost |
|-----|------|------|
| [RxNorm (NLM)](https://rxnav.nlm.nih.gov) | Drug interactions, drug lookup | Free, no key |
| [OpenFDA](https://api.fda.gov) | Drug labels, adverse events | Free, no key |
| [NPPES NPI Registry](https://npiregistry.cms.hhs.gov) | Provider verification | Free, no key |
| [CMS Provider Data](https://data.cms.gov/provider-data) | Hospital quality, physician data | Free, no key |
| [PubMed (NCBI)](https://eutils.ncbi.nlm.nih.gov) | Medical literature | Free, no key |
| [ClinicalTrials.gov](https://clinicaltrials.gov/api/v2) | Clinical trials | Free, no key |

---

## Open Source Foundations (Referenced)

- [OpenHealth](https://github.com/OpenHealthForAll/open-health) — PHR + LLM chat platform (3.9k ⭐)
- [Medplum](https://github.com/medplum/medplum) — FHIR-native developer platform (2.3k ⭐)
- [HAPI FHIR](https://github.com/hapifhir/hapi-fhir) — Java FHIR library (2.3k ⭐)
- [awesome-healthcare](https://github.com/kakoni/awesome-healthcare) — Curated health OSS directory (3.8k ⭐)

---

## Disclaimer

**vitaops is not a medical device. It does not provide medical advice, diagnoses, or treatment recommendations. All information is for educational purposes to support conversations with your licensed healthcare providers. Always consult a qualified medical professional before making any health decisions.**

In case of a medical emergency, call 911 (US), 999 (UK), 112 (EU), or your local emergency number.

---

*Built to make patients more powerful. Inspired by the information gap between what doctors know and what patients are told.*
