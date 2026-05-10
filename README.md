# vitaops

<p align="center">
  <strong>AI-Powered Personal Health Advocacy Agent</strong><br/>
  Walk into every doctor's appointment prepared. Never let an insurance denial go unanswered.<br/>
  Understand what your diagnosis actually means — in plain English.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vitaops"><img src="https://img.shields.io/npm/v/vitaops?color=0ea5e9&label=npm" alt="npm version"/></a>
  <a href="https://github.com/abhisekjha/vitaops/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="Node.js 18+"/>
  <img src="https://img.shields.io/badge/APIs-free%2C%20no%20key-blue" alt="Free APIs"/>
  <img src="https://img.shields.io/badge/data-stays%20on%20your%20machine-purple" alt="Privacy"/>
</p>

---

## The problem

Every year, patients are misdiagnosed, overtreated, undertreated, and overcharged — not because medicine is bad, but because of **information asymmetry**.

Your doctor spent a decade learning things you don't know. Your insurer wrote a 200-page policy you've never read. Your pharmacist knows drug interaction risks your prescriber forgot to mention. The hospital bill you received has errors no one told you to check for.

Most people walk into doctor appointments with no prepared questions. Most people accept the first insurance denial without knowing they had the right to appeal — and a 40-70% chance of winning. Most people don't know a second opinion is their right, not a luxury.

**vitaops closes that gap.** Not by replacing your doctor. By making you a better patient.

---

## What vitaops does

```
You: "My insurance just denied my MRI. It's for a herniated disc that's been 
      giving me nerve pain for 3 months."

vitaops:
  ✅ Reads your insurance profile
  ✅ Identifies denial reason code and appeal strategy
  ✅ Drafts a complete appeal letter with medical necessity argument
  ✅ Cites clinical guidelines supporting your case (NASS, AAOS)
  ✅ Gives you the filing deadline (typically 180 days from denial)
  ✅ Explains your rights under your state's insurance law
  ✅ Tells you exactly what to do next, step by step
```

```
You: "I have an endocrinology appointment on Tuesday."

vitaops:
  ✅ Pulls your current medication list
  ✅ Generates 10 targeted questions for this specific appointment
  ✅ Lists recent lab results to discuss
  ✅ Tells you what screenings to ask about (based on your age/conditions)
  ✅ Reminds you what to bring (and your expected co-pay)
  ✅ Flags any red-flag symptoms to report immediately
  ✅ Creates a printable prep sheet
```

```
You: "Can I take ibuprofen with my current medications?"

vitaops:
  ✅ Looks up your medication list
  ✅ Queries RxNorm Interaction API (live, free, real data)
  ✅ Returns severity levels for each drug pair
  ✅ Pulls top adverse events from OpenFDA
  ✅ Flags contraindicated combinations immediately
  ✅ Recommends who to call and what to say
```

---

## Quick start

```bash
# Clone and install
git clone https://github.com/abhisekjha/vitaops
cd vitaops
npm install

# Validate setup (checks APIs, directories, and your profile files)
vitaops doctor

# Open your AI CLI and start talking
claude     # Claude Code
# or: gemini, opencode, copilot, codex — any agent CLI works
```

On first launch, vitaops guides you through a one-time setup:
creating your health profile, adding your insurance details, building your medication list, and setting your care team. Takes about 10 minutes. Saves hours at every appointment.

---

## Modes

| Mode | Trigger | What it does |
|------|---------|-------------|
| **evaluate** | New diagnosis, test results, symptoms | Deep-dives any health situation: plain-language explanation, peer-reviewed research, questions for your doctor, action timeline, insurance risk |
| **appointment** | "I have an appointment on [date]" | Full prep: targeted question list, medication list to bring, screenings due, what to report, what to watch for after |
| **medication** | "Check my medications" or drug name | Live RxNorm interaction check, side effects via OpenFDA, generic alternatives, timing and food interactions |
| **insurance** | Denial, prior auth, EOB, claims | Decodes denial reason codes, writes complete appeal letters with clinical citations, explains your rights, tracks deadlines |
| **research** | "Research [condition/drug/treatment]" | Evidence-ranked summary: systematic reviews, RCTs, clinical guidelines, ongoing trials (ClinicalTrials.gov), patient resources |
| **scan** | "Find a [specialist] in [city]" | Live NPPES provider search: NPI verification, board certification status, hospital affiliations, CMS quality data |
| **second-opinion** | "Should I get a second opinion?" | Scores the recommendation 1-5, explains how to get records, where to go by condition type, how to handle conflicting opinions |
| **advocate** | "Write a letter" | Generates professional medical letters: records requests, referrals, medical necessity, appeals, complaints |

---

## CLI tools

```bash
# Drug interaction check — live RxNorm API, no key needed
vitaops check "warfarin" "aspirin" "ibuprofen"

# Provider search — live NPPES NPI Registry
vitaops find --specialty "cardiology" --city "San Francisco" --state "CA"

# Validate your setup
vitaops doctor

# Check for updates (never touches your personal files)
vitaops update check
```

**Example output — drug interaction check:**
```
💊 vitaops Drug Interaction Checker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Checking: warfarin, aspirin, ibuprofen
Source: RxNorm API (NLM) + OpenFDA

🔴 MAJOR: Warfarin × Ibuprofen
   Description: NSAIDs may increase the anticoagulant effect of warfarin,
                increasing the risk of bleeding
   Action: Contact prescriber before taking together
   Source: DrugBank + NDF-RT

🟡 MODERATE: Warfarin × Aspirin
   Description: Concurrent use may increase risk of bleeding
   Action: Monitor closely; discuss with pharmacist or doctor
```

**Example output — provider search:**
```
🔍 vitaops Provider Search
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Specialty: endocrinology | Location: Boston, MA

1. ADHAM ABDEL MOTTALIB MD
   NPI:       1740774892
   Specialty: Internal Medicine, Endocrinology, Diabetes & Metabolism
   Location:  1 JOSLIN PL, BOSTON, MA
   Phone:     617-309-2695   (Joslin Diabetes Center)
```

---

## How it works

vitaops uses the same agent architecture as [career-ops](https://github.com/abhisekjha/career-ops) — a structured set of markdown mode files that any AI CLI can read and execute.

```
vitaops/
├── CLAUDE.md              → Entry point (one line: @AGENTS.md)
├── AGENTS.md              → Complete behavioral spec (the brain)
├── modes/
│   ├── _shared.md         → System logic: urgency scale, source hierarchy, standards
│   ├── _profile.md        → YOUR preferences: never auto-updated
│   ├── evaluate.md        → Diagnosis/symptom evaluation mode
│   ├── appointment.md     → Appointment preparation mode
│   ├── medication.md      → Drug interaction + safety mode
│   ├── insurance.md       → Insurance navigation + appeal mode
│   ├── research.md        → Evidence-based medical research mode
│   ├── scan.md            → Provider search mode
│   ├── second-opinion.md  → Second opinion guidance mode
│   └── advocate.md        → Letter generation mode
├── config/
│   ├── profile.yml        → Your identity + insurance (gitignored)
│   └── providers.yml      → Your care team (gitignored)
├── data/                  → Your tracking data (gitignored)
├── reports/               → Evaluation reports (gitignored)
├── output/                → Generated letters (gitignored)
└── scripts/
    ├── check-interactions.mjs   → RxNorm drug interaction API
    ├── find-providers.mjs       → NPPES NPI Registry search
    ├── doctor.mjs               → Setup validator
    └── update-system.mjs        → System updater
```

**Two-layer data separation — your health data never leaves your machine:**

| Layer | Files | Auto-updated? |
|-------|-------|---------------|
| **User layer** | `health-profile.md`, `config/profile.yml`, `modes/_profile.md`, `data/*`, `reports/*` | Never |
| **System layer** | `modes/_shared.md`, `scripts/*`, `templates/*`, `AGENTS.md` | Yes (safe) |

---

## Free APIs — no key required

| API | Data | Rate limit |
|-----|------|------------|
| [RxNorm (NLM/NIH)](https://rxnav.nlm.nih.gov) | Drug interactions, RxCUI lookup, drug names | 20 req/sec |
| [OpenFDA](https://api.fda.gov) | Drug labels, adverse events, recalls | 240M records |
| [NPPES NPI Registry](https://npiregistry.cms.hhs.gov) | All licensed US providers | Unlimited |
| [CMS Provider Data](https://data.cms.gov/provider-data) | Hospital quality, physician data | Unlimited |
| [PubMed (NCBI)](https://eutils.ncbi.nlm.nih.gov) | Peer-reviewed medical literature | 3 req/sec |
| [ClinicalTrials.gov](https://clinicaltrials.gov/api/v2) | Active clinical trials | Unlimited |

---

## Works with any AI CLI

vitaops is agent-agnostic. The AGENTS.md spec runs on any AI that can read files:

```bash
# Claude Code
claude

# Gemini CLI
gemini

# OpenCode
opencode

# GitHub Copilot (Workspace)
# Codex CLI
```

---

## Philosophy

**1. Human-in-the-loop, always.**
vitaops never submits anything on your behalf. It drafts, explains, and prepares. You review. You decide. Your doctor treats.

**2. Information, not advice.**
Every output ends with: *⚕️ This is health information to support your conversations with your healthcare providers — not medical advice.* This isn't a disclaimer to ignore. It's the design principle.

**3. Emergency first.**
Every session scans for emergency symptom patterns before doing anything else. If you describe chest pain, stroke symptoms, or a suicidal crisis — vitaops stops everything and tells you to call 911.

**4. Your data stays on your machine.**
No cloud storage. No accounts. No telemetry. Your health history, medications, and insurance details live in files only you can see, in a directory only you control.

**5. Cite everything.**
Every medical claim includes a source. NIH, Mayo Clinic, peer-reviewed journals, clinical guidelines. Never "studies suggest." Always: which study, which year, which finding.

---

## Setup in detail

### Prerequisites
- Node.js 18+
- An AI CLI: [Claude Code](https://claude.ai/code), [Gemini CLI](https://github.com/google-gemini/gemini-cli), [OpenCode](https://github.com/sst/opencode), or equivalent

### 1. Clone and install
```bash
git clone https://github.com/abhisekjha/vitaops
cd vitaops
npm install
```

### 2. Run doctor
```bash
vitaops doctor
```
This tells you exactly what's missing and how to fix it.

### 3. Open your AI CLI and start setup
```bash
claude
# Say: "help me set up vitaops"
```
vitaops guides you through creating:
- `health-profile.md` — your health history (conditions, allergies, family history)
- `config/profile.yml` — your insurance details (member ID, carrier, plan type)
- `config/providers.yml` — your care team (your PCPs, specialists, pharmacy)
- `modes/_profile.md` — your advocacy preferences and communication style
- `data/medications.md` — your current medication list

### 4. You're ready
```bash
claude
# "I was just diagnosed with Type 2 Diabetes. Help me understand what this means."
# "I have a cardiology appointment next Friday."
# "My insurance denied my sleep study. Write me an appeal."
# "Find me a rheumatologist in Seattle who takes Aetna."
```

---

## What vitaops is NOT

- ❌ A medical device
- ❌ A diagnostic tool
- ❌ A replacement for your doctor, pharmacist, or insurer
- ❌ Able to prescribe, diagnose, or treat
- ❌ Able to guarantee insurance outcomes
- ❌ A telemedicine platform

**It is:** an information and organizational tool that helps you navigate a complex system more effectively as an informed patient.

---

## Inspiration & related work

The open-source health ecosystem is large. vitaops stands on shoulders:

| Project | What it does | Stars |
|---------|-------------|-------|
| [OpenHealth](https://github.com/OpenHealthForAll/open-health) | Self-hosted PHR + LLM chat with your records | 3.9k |
| [Fasten Health](https://github.com/fastenhealth/fasten-onprem) | Aggregate FHIR records from 1,200+ health systems | 2.7k |
| [Medplum](https://github.com/medplum/medplum) | FHIR-native developer platform | 2.3k |
| [awesome-healthcare](https://github.com/kakoni/awesome-healthcare) | Curated open-source health software directory | 3.8k |

vitaops differs by design: it's an **agent system**, not a web app. It runs locally, works with any AI CLI, and is structured around advocacy workflows — not data visualization.

---

## Contributing

Contributions are welcome. High-value areas:

- **New modes:** mental health check-in, eldercare coordination, lab result interpretation
- **International support:** non-US insurance systems, international provider APIs, localized modes (UK NHS, EU healthcare systems)
- **Better APIs:** integrate DrugBank for richer interaction data, Leapfrog for hospital safety grades
- **Templates:** condition-specific advocacy templates (cancer, rare disease, mental health)
- **Testing:** test scripts that validate the API integrations and mode logic

```bash
git checkout -b feature/your-mode-name
# build and test
git push origin feature/your-mode-name
# open a PR
```

---

## License

MIT — use it, fork it, build on it. If vitaops helps you win a fight with your insurance company, you don't owe us anything. Go to your appointment.

---

<p align="center">
  <em>Built to make patients more powerful.<br/>
  Inspired by the information gap between what doctors know and what patients are told.</em>
</p>

---

> **Medical Disclaimer:** vitaops is not a medical device and does not provide medical advice, diagnoses, or treatment recommendations. All information is for educational purposes to support conversations with licensed healthcare providers. Always consult a qualified medical professional before making any health decisions. In case of emergency, call 911 (US) · 999 (UK) · 112 (EU) or your local emergency number.
