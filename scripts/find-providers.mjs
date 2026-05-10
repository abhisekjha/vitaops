#!/usr/bin/env node
/**
 * vitaops — Provider Finder
 * Uses NPPES NPI Registry + CMS Provider Data (both free, no API key)
 * Usage: node scripts/find-providers.mjs --specialty "cardiology" --city "San Francisco" --state "CA"
 */

const NPPES_API = 'https://npiregistry.cms.hhs.gov/api/';
const CMS_HOSPITAL_API = 'https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0'; // Hospital General Info

function parseArgs(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      opts[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return opts;
}

async function searchNPPES({ specialty, city, state, zip, firstName, lastName }) {
  const params = new URLSearchParams({
    version: '2.1',
    limit: '10',
    skip: '0',
  });

  if (firstName) params.set('first_name', firstName);
  if (lastName) params.set('last_name', lastName);
  if (city) params.set('city', city);
  if (state) params.set('state', state);
  if (zip) params.set('postal_code', zip);
  if (specialty) params.set('taxonomy_description', specialty);

  params.set('enumeration_type', 'NPI-1'); // Individual providers

  const url = `${NPPES_API}?${params}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.results || [];
}

function formatProvider(result) {
  const basic = result.basic || {};
  const taxonomies = result.taxonomies || [];
  const addresses = result.addresses || [];

  const primaryTax = taxonomies.find(t => t.primary) || taxonomies[0] || {};
  const practiceAddr = addresses.find(a => a.address_purpose === 'LOCATION') || addresses[0] || {};

  return {
    npi: result.number,
    name: [basic.first_name, basic.middle_name, basic.last_name, basic.credential]
      .filter(Boolean).join(' '),
    specialty: primaryTax.desc || 'Unknown',
    license: primaryTax.license || 'N/A',
    state_license: primaryTax.state || 'N/A',
    address: [
      practiceAddr.address_1,
      practiceAddr.address_2,
      practiceAddr.city,
      practiceAddr.state,
      practiceAddr.postal_code
    ].filter(Boolean).join(', '),
    phone: practiceAddr.telephone_number || 'N/A',
    fax: practiceAddr.fax_number || 'N/A',
    gender: basic.gender === 'M' ? 'Male' : basic.gender === 'F' ? 'Female' : 'N/A',
    enumeration_date: basic.enumeration_date || 'N/A',
    status: basic.status || 'N/A',
  };
}

async function main() {
  const args = process.argv.slice(2);
  const opts = parseArgs(args);

  if (!opts.specialty && !opts.lastName) {
    console.log(`\n💊 vitaops Provider Finder`);
    console.log(`Usage:`);
    console.log(`  node scripts/find-providers.mjs --specialty "cardiology" --city "Boston" --state "MA"`);
    console.log(`  node scripts/find-providers.mjs --last-name "Smith" --state "CA" --specialty "endocrinology"`);
    console.log(`\nOptions:`);
    console.log(`  --specialty     e.g. "cardiology", "endocrinology", "internal medicine"`);
    console.log(`  --city          e.g. "San Francisco"`);
    console.log(`  --state         e.g. "CA"`);
    console.log(`  --zip           e.g. "94105"`);
    console.log(`  --first-name    Search by first name`);
    console.log(`  --last-name     Search by last name`);
    process.exit(0);
  }

  console.log(`\n🔍 vitaops Provider Search`);
  console.log(`${'━'.repeat(50)}`);
  console.log(`Specialty: ${opts.specialty || 'Any'}`);
  console.log(`Location:  ${[opts.city, opts.state, opts.zip].filter(Boolean).join(', ') || 'Any'}`);
  console.log(`Source:    NPPES NPI Registry (CMS)\n`);

  const results = await searchNPPES({
    specialty: opts.specialty,
    city: opts.city,
    state: opts.state,
    zip: opts.zip,
    firstName: opts['first-name'],
    lastName: opts['last-name'],
  });

  if (!results.length) {
    console.log('❌ No providers found with these search criteria.');
    console.log('   Try: broader specialty name, different city spelling, or remove city filter.');
    process.exit(0);
  }

  console.log(`Found ${results.length} provider(s):\n`);

  results.forEach((result, i) => {
    const p = formatProvider(result);
    console.log(`${i + 1}. ${p.name}`);
    console.log(`   NPI:       ${p.npi}  (verify: npiregistry.cms.hhs.gov)`);
    console.log(`   Specialty: ${p.specialty}`);
    console.log(`   Location:  ${p.address}`);
    console.log(`   Phone:     ${p.phone}`);
    console.log(`   Gender:    ${p.gender}`);
    console.log(`   Status:    ${p.status}`);
    console.log(`   License:   ${p.state_license} (${p.license})`);
    console.log(``);
  });

  console.log(`${'─'.repeat(50)}`);
  console.log(`📋 Next Steps:`);
  console.log(`  1. Call each provider to verify: in-network status, new patient availability`);
  console.log(`  2. Check disciplinary actions: your state medical board website`);
  console.log(`  3. Verify board certification: certificationmatters.org`);
  console.log(`  4. Check hospital quality: medicare.gov/care-compare`);
  console.log(`${'━'.repeat(50)}`);
  console.log(`⚕️  Provider data from NPPES (updated monthly). Always verify directly with provider.`);
  console.log(`${'━'.repeat(50)}\n`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
