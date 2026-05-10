#!/usr/bin/env node
/**
 * vitaops CLI
 * Usage:
 *   vitaops doctor                       — validate setup
 *   vitaops check "warfarin" "aspirin"   — drug interaction check
 *   vitaops find --specialty cardiology --city Boston --state MA
 *   vitaops help                         — show all commands
 */

import { createRequire } from 'module';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const [, , command, ...args] = process.argv;

const COMMANDS = {
  doctor: {
    script: 'scripts/doctor.mjs',
    desc: 'Validate your vitaops setup',
    usage: 'vitaops doctor',
  },
  check: {
    script: 'scripts/check-interactions.mjs',
    desc: 'Check drug interactions (RxNorm API)',
    usage: 'vitaops check "warfarin" "aspirin" ["ibuprofen"]',
  },
  find: {
    script: 'scripts/find-providers.mjs',
    desc: 'Find providers by specialty and location',
    usage: 'vitaops find --specialty "cardiology" --city "Boston" --state "MA"',
  },
  update: {
    script: 'scripts/update-system.mjs',
    desc: 'Check for or apply system updates',
    usage: 'vitaops update [check|apply|rollback]',
  },
};

function printHelp() {
  console.log(`
💊 vitaops — AI Personal Health Advocacy Agent
${'─'.repeat(50)}

  Open Claude Code (or Gemini CLI) in this directory
  and talk naturally — vitaops handles the rest.

CLI Tools:

  vitaops doctor
    ${COMMANDS.doctor.desc}

  vitaops check "drug1" "drug2" [...]
    ${COMMANDS.check.desc}
    Example: vitaops check "metformin" "lisinopril" "aspirin"

  vitaops find --specialty <s> --city <c> --state <s>
    ${COMMANDS.find.desc}
    Example: vitaops find --specialty "endocrinology" --city "Boston" --state "MA"

  vitaops update [check|apply]
    ${COMMANDS.update.desc}

${'─'.repeat(50)}
  ⚕️  Not medical advice. Always consult your doctor.
${'─'.repeat(50)}
`);
}

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

const cmd = COMMANDS[command];
if (!cmd) {
  console.error(`\n❌ Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}

const scriptPath = join(ROOT, cmd.script);
const result = spawnSync(process.execPath, [scriptPath, ...args], {
  stdio: 'inherit',
  cwd: ROOT,
});

process.exit(result.status ?? 0);
