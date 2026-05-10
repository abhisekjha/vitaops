#!/usr/bin/env node
/**
 * vitaops — Setup Validator
 * Checks all prerequisites before first use.
 * Usage: node scripts/doctor.mjs
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const checks = [
  {
    name: 'Node.js version',
    check: () => {
      const [major] = process.versions.node.split('.').map(Number);
      return major >= 18;
    },
    fix: 'Install Node.js 18+ from nodejs.org',
  },
  {
    name: 'health-profile.md',
    check: () => existsSync(join(ROOT, 'health-profile.md')),
    fix: 'Run vitaops and ask Claude to help you create your health profile',
  },
  {
    name: 'config/profile.yml',
    check: () => existsSync(join(ROOT, 'config', 'profile.yml')),
    fix: 'Copy config/profile.example.yml → config/profile.yml and fill in your details',
  },
  {
    name: 'config/providers.yml',
    check: () => existsSync(join(ROOT, 'config', 'providers.yml')),
    fix: 'Copy templates/providers.example.yml → config/providers.yml and add your care team',
  },
  {
    name: 'modes/_profile.md',
    check: () => existsSync(join(ROOT, 'modes', '_profile.md')),
    fix: 'Copy modes/_profile.template.md → modes/_profile.md and customize your preferences',
  },
  {
    name: 'data/medications.md',
    check: () => existsSync(join(ROOT, 'data', 'medications.md')),
    fix: 'Run vitaops and ask Claude to help you create your medication list',
  },
  {
    name: 'data/ directory',
    check: () => existsSync(join(ROOT, 'data')),
    fix: 'Run: mkdir -p data reports output',
  },
  {
    name: 'reports/ directory',
    check: () => existsSync(join(ROOT, 'reports')),
    fix: 'Run: mkdir -p reports',
  },
  {
    name: 'output/ directory',
    check: () => existsSync(join(ROOT, 'output')),
    fix: 'Run: mkdir -p output',
  },
  {
    name: 'AGENTS.md',
    check: () => existsSync(join(ROOT, 'AGENTS.md')),
    fix: 'AGENTS.md is missing — reinstall vitaops',
  },
  {
    name: 'modes/_shared.md',
    check: () => existsSync(join(ROOT, 'modes', '_shared.md')),
    fix: 'modes/_shared.md is missing — reinstall vitaops',
  },
  {
    name: 'RxNorm API reachable',
    check: async () => {
      try {
        const res = await fetch('https://rxnav.nlm.nih.gov/REST/version.json', { signal: AbortSignal.timeout(5000) });
        return res.ok;
      } catch {
        return false;
      }
    },
    fix: 'Check your internet connection. RxNorm API is free and requires no key.',
    optional: true,
  },
  {
    name: 'NPPES API reachable',
    check: async () => {
      try {
        const res = await fetch('https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=1&taxonomy_description=cardiology', { signal: AbortSignal.timeout(5000) });
        return res.ok;
      } catch {
        return false;
      }
    },
    fix: 'Check your internet connection. NPPES API is free and requires no key.',
    optional: true,
  },
];

async function main() {
  console.log(`\n💊 vitaops Doctor — Setup Validator`);
  console.log(`${'━'.repeat(50)}\n`);

  let allPassed = true;
  let requiredFailed = 0;

  for (const item of checks) {
    process.stdout.write(`  Checking ${item.name}... `);
    let passed = false;
    try {
      const result = item.check();
      passed = result instanceof Promise ? await result : result;
    } catch {
      passed = false;
    }

    if (passed) {
      console.log('✅');
    } else {
      const marker = item.optional ? '⚠️  (optional)' : '❌';
      console.log(marker);
      console.log(`     Fix: ${item.fix}`);
      if (!item.optional) {
        requiredFailed++;
        allPassed = false;
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`);

  if (allPassed) {
    console.log(`\n✅ All checks passed! vitaops is ready to use.`);
    console.log(`\nGet started:`);
    console.log(`  • Open Claude Code in this directory`);
    console.log(`  • Say "evaluate my recent diagnosis" to evaluate a health situation`);
    console.log(`  • Say "prepare for my appointment on [date]" to prep for a visit`);
    console.log(`  • Say "check my medications for interactions" to run a safety check`);
  } else {
    console.log(`\n❌ ${requiredFailed} required check(s) failed.`);
    console.log(`   Fix the issues above and run \`npm run doctor\` again.`);
    console.log(`\n   For setup help: open Claude Code and say "help me set up vitaops"`);
    process.exit(1);
  }

  console.log(`\n${'━'.repeat(50)}`);
  console.log(`⚕️  vitaops — AI Health Advocacy Agent`);
  console.log(`   Not a medical device. Not medical advice. Always consult your doctor.`);
  console.log(`${'━'.repeat(50)}\n`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
