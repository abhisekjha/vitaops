#!/usr/bin/env node
/**
 * vitaops — Drug Interaction Checker
 * Uses RxNorm API (free, no API key required)
 * Usage: node scripts/check-interactions.mjs "metformin" "lisinopril" "aspirin"
 */

const BASE_RXNORM = 'https://rxnav.nlm.nih.gov/REST';
const BASE_OPENFDA = 'https://api.fda.gov';

async function getRxCUI(drugName) {
  const url = `${BASE_RXNORM}/drugs.json?name=${encodeURIComponent(drugName)}`;
  const res = await fetch(url);
  const data = await res.json();
  const concepts = data?.drugGroup?.conceptGroup;
  if (!concepts) return null;
  for (const group of concepts) {
    if (group.conceptProperties) {
      return group.conceptProperties[0].rxcui;
    }
  }
  return null;
}

async function getDrugInfo(rxcui, drugName) {
  const url = `${BASE_RXNORM}/rxcui/${rxcui}/allinfo.json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.rxcuiStatusHistory?.definitionalFeatures?.doseFormGroupConcept?.[0]?.doseFormGroupName || drugName;
  } catch {
    return drugName;
  }
}

async function checkInteractions(rxcuis) {
  const cuiString = rxcuis.join('+');
  const url = `${BASE_RXNORM}/interaction/list.json?rxcuis=${cuiString}`;
  const res = await fetch(url);
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    return data?.fullInteractionTypeGroup || [];
  } catch {
    return [];
  }
}

async function getOpenFDAAdverseEvents(drugName) {
  const url = `${BASE_OPENFDA}/drug/event.json?search=patient.drug.openfda.generic_name:"${encodeURIComponent(drugName)}"&count=patient.reaction.reactionmeddrapt.exact&limit=5`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.results?.slice(0, 5).map(r => r.term) || [];
  } catch {
    return [];
  }
}

const SEVERITY_LABELS = {
  'N/A': { emoji: '⚪', label: 'Unknown', action: 'Consult pharmacist' },
  'Low Severity': { emoji: '🟢', label: 'Minor', action: 'Be aware; monitor for listed symptoms' },
  'Moderate Severity': { emoji: '🟡', label: 'Moderate', action: 'Monitor closely; discuss with pharmacist or doctor' },
  'High Severity': { emoji: '🔴', label: 'Major', action: 'Contact prescriber before taking together' },
  'Contraindicated': { emoji: '🚫', label: 'Contraindicated', action: 'DO NOT COMBINE — contact your doctor immediately' },
};

async function main() {
  const drugs = process.argv.slice(2);

  if (drugs.length < 2) {
    console.error('Usage: node scripts/check-interactions.mjs "drug1" "drug2" ["drug3" ...]');
    console.error('Example: node scripts/check-interactions.mjs "metformin" "lisinopril" "aspirin"');
    process.exit(1);
  }

  console.log(`\n💊 vitaops Drug Interaction Checker`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Checking: ${drugs.join(', ')}`);
  console.log(`Source: RxNorm API (NLM) + OpenFDA\n`);

  const rxcuiMap = {};
  for (const drug of drugs) {
    process.stdout.write(`  Looking up ${drug}... `);
    const rxcui = await getRxCUI(drug);
    if (rxcui) {
      rxcuiMap[drug] = rxcui;
      console.log(`✅ RxCUI: ${rxcui}`);
    } else {
      console.log(`❌ Not found — check spelling`);
    }
  }

  const foundDrugs = Object.keys(rxcuiMap);
  if (foundDrugs.length < 2) {
    console.log('\n⚠️  Need at least 2 recognized drug names to check interactions.');
    process.exit(1);
  }

  console.log(`\n📋 Interaction Analysis\n${'─'.repeat(50)}`);

  const rxcuis = Object.values(rxcuiMap);
  const interactionGroups = await checkInteractions(rxcuis);

  if (!interactionGroups.length) {
    console.log('✅ No interactions found in RxNorm database for this combination.');
    console.log('   (Note: absence of data does not guarantee safety — consult your pharmacist)');
  } else {
    let foundAny = false;
    for (const group of interactionGroups) {
      for (const type of group.fullInteractionType || []) {
        for (const pair of type.interactionPair || []) {
          foundAny = true;
          const severity = pair.severity || 'N/A';
          const info = SEVERITY_LABELS[severity] || SEVERITY_LABELS['N/A'];
          const drugNames = pair.interactionConcept
            .map(c => c.minConceptItem?.name || 'Unknown')
            .join(' × ');

          console.log(`\n${info.emoji} ${info.label.toUpperCase()}: ${drugNames}`);
          console.log(`   Description: ${pair.description || 'No description available'}`);
          console.log(`   Action: ${info.action}`);
          console.log(`   Source: ${type.comment || group.sourceName || 'RxNorm'}`);
        }
      }
    }
    if (!foundAny) {
      console.log('✅ No known interactions found for this combination.');
    }
  }

  console.log(`\n🔍 Top Reported Adverse Events (OpenFDA)\n${'─'.repeat(50)}`);
  for (const drug of foundDrugs) {
    const events = await getOpenFDAAdverseEvents(drug);
    if (events.length) {
      console.log(`\n${drug}: ${events.join(', ')}`);
    }
  }

  console.log(`\n${'━'.repeat(50)}`);
  console.log(`⚕️  This information is from public medical databases and is not medical advice.`);
  console.log(`   Always verify interactions with your pharmacist or prescribing physician.`);
  console.log(`${'━'.repeat(50)}\n`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
