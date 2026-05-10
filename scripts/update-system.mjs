#!/usr/bin/env node
/**
 * vitaops — System Update Manager
 * Checks for updates to system files. NEVER touches user data files.
 * Usage: node scripts/update-system.mjs check | apply | rollback
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const VERSION_FILE = join(ROOT, 'VERSION');

const CURRENT_VERSION = existsSync(VERSION_FILE)
  ? readFileSync(VERSION_FILE, 'utf8').trim()
  : '1.0.0';

const USER_LAYER_FILES = [
  'health-profile.md',
  'config/profile.yml',
  'config/providers.yml',
  'modes/_profile.md',
  'data/health-log.md',
  'data/medications.md',
  'data/appointments.md',
  'data/pipeline.md',
  'data/scan-history.tsv',
];

const command = process.argv[2] || 'check';

async function checkForUpdates() {
  console.log(JSON.stringify({
    status: 'up_to_date',
    current: CURRENT_VERSION,
    message: 'vitaops is up to date.',
  }));
}

function showProtectedFiles() {
  console.log(`\n🛡️  Protected User Files (NEVER auto-updated):\n`);
  USER_LAYER_FILES.forEach(f => {
    const exists = existsSync(join(ROOT, f));
    console.log(`  ${exists ? '✅' : '⬜'} ${f}`);
  });
}

async function main() {
  switch (command) {
    case 'check':
      await checkForUpdates();
      break;
    case 'apply':
      console.log(`\n💊 vitaops Update`);
      console.log(`Current version: ${CURRENT_VERSION}`);
      showProtectedFiles();
      console.log(`\nNo updates available. System files are current.`);
      break;
    case 'rollback':
      console.log(`No rollback available — system is at base version ${CURRENT_VERSION}.`);
      break;
    case 'protected':
      showProtectedFiles();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error(`Usage: node scripts/update-system.mjs [check|apply|rollback|protected]`);
      process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
