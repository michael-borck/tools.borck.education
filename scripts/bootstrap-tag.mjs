#!/usr/bin/env node
// Reads bootstrap-repos.txt and applies the 'borck-edu' topic to each
// remaining repo via gh repo edit. Idempotent — safe to re-run.

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOPIC = 'borck-edu';
const IN_FILE = 'bootstrap-repos.txt';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function parseList(text) {
  return text
    .split('\n')
    .map(l => l.split('#')[0].trim())
    .filter(l => l && /^[\w.-]+\/[\w.-]+$/.test(l));
}

function tag(slug) {
  try {
    execFileSync('gh', ['repo', 'edit', slug, '--add-topic', TOPIC], {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, err: (e.stderr || e.message || '').toString().trim() };
  }
}

function main() {
  const inPath = join(projectRoot, IN_FILE);
  if (!existsSync(inPath)) {
    console.error(`Missing ${IN_FILE}. Run 'npm run bootstrap:list' first.`);
    process.exit(1);
  }

  const slugs = parseList(readFileSync(inPath, 'utf-8'));
  if (slugs.length === 0) {
    console.error(`No repos parsed from ${IN_FILE}.`);
    process.exit(1);
  }

  console.log(`Tagging ${slugs.length} repos with '${TOPIC}'…`);
  let okCount = 0;
  const failed = [];
  for (const slug of slugs) {
    process.stdout.write(`  ${slug} … `);
    const res = tag(slug);
    if (res.ok) {
      console.log('ok');
      okCount++;
    } else {
      console.log(`FAILED — ${res.err}`);
      failed.push({ slug, err: res.err });
    }
  }

  console.log('');
  console.log(`Done: ${okCount}/${slugs.length} tagged.`);
  if (failed.length) {
    console.log(`Failed:`);
    for (const f of failed) console.log(`  ${f.slug}: ${f.err}`);
    process.exit(1);
  }
  console.log(`Next: npm run sync (or wait for the daily cron)`);
}

try {
  main();
} catch (e) {
  if (e.code === 'ENOENT') {
    console.error('Error: gh CLI not found. Install: https://cli.github.com/');
    process.exit(1);
  }
  console.error(e.message || e);
  process.exit(1);
}
