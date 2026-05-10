#!/usr/bin/env node
// Generates bootstrap-untag.txt — currently-tagged repos, one per line.
// Workflow:
//   1. npm run bootstrap:untag:list  →  writes bootstrap-untag.txt
//   2. open it, DELETE lines for repos you want to KEEP tagged (real tools)
//   3. npm run bootstrap:untag        →  removes the topic from remaining lines
//
// Semantics match the existing bootstrap pair: a line that survives the prune
// is acted on. Here the action is "remove the topic".

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = 'michael-borck';
const TOPIC = 'borck-edu';
const OUT_FILE = 'bootstrap-untag.txt';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function ghJson(args) {
  const out = execFileSync('gh', args, { encoding: 'utf-8', maxBuffer: 16 * 1024 * 1024 });
  return JSON.parse(out);
}

function main() {
  console.log(`Listing repos under ${USER} currently tagged '${TOPIC}'…`);
  const items = ghJson([
    'search', 'repos',
    `user:${USER}`, `topic:${TOPIC}`,
    '--limit', '500',
    '--json', 'name,description',
  ]);

  const sorted = items
    .map(r => ({ name: r.name, description: r.description || '' }))
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`  ${sorted.length} repos currently carry '${TOPIC}'`);

  const lines = [];
  lines.push(`# borck.education — untag list`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push(`#`);
  lines.push(`# DELETE lines for repos you want to KEEP tagged (real tools).`);
  lines.push(`# What's LEFT will have the '${TOPIC}' topic REMOVED.`);
  lines.push(`# When done:  npm run bootstrap:untag`);
  lines.push('');

  const maxLen = sorted.reduce((m, r) => Math.max(m, `${USER}/${r.name}`.length), 0);
  for (const r of sorted) {
    const slug = `${USER}/${r.name}`;
    const desc = r.description ? r.description.slice(0, 80) : '';
    lines.push(desc ? `${slug.padEnd(maxLen)}  # ${desc}` : slug);
  }

  const outPath = join(projectRoot, OUT_FILE);
  writeFileSync(outPath, lines.join('\n') + '\n');
  console.log(`Wrote ${OUT_FILE} (${sorted.length} repos)`);
  console.log('');
  console.log(`Next: edit ${OUT_FILE}, DELETE lines for repos to keep tagged, then:`);
  console.log('  npm run bootstrap:untag');
}

try { main(); } catch (e) {
  if (e.code === 'ENOENT') {
    console.error('Error: gh CLI not found. Install: https://cli.github.com/');
    process.exit(1);
  }
  console.error(e.message || e);
  process.exit(1);
}
