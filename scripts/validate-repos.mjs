#!/usr/bin/env node
// Validates that each landing page's repo="owner/name" prop matches the
// tool's github URL in tools.data.json. The runtime GitHub API fetch in
// app-landing.js uses data-repo verbatim and does not follow rename redirects,
// so a mismatch would silently serve the wrong download buttons.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function ownerRepo(githubUrl) {
  const m = /github\.com\/([^/]+\/[^/#?]+)/.exec(githubUrl || '');
  return m ? m[1].replace(/\.git$/, '') : null;
}

const tools = JSON.parse(readFileSync(join(root, 'src/data/tools.data.json'), 'utf8'));
const errors = [];

for (const t of tools.filter(t => t.page)) {
  const slug = String(t.page).replace(/\//g, '');
  const file = join(root, 'src/pages', `${slug}.astro`);
  const expected = ownerRepo(t.github);

  if (!expected) {
    errors.push(`${t.id}: has a landing page but no valid github URL in tools.data.json`);
    continue;
  }

  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch {
    errors.push(`${t.id}: landing page not found at src/pages/${slug}.astro`);
    continue;
  }

  const m = /repo="([^"]+)"/.exec(src);
  if (!m) {
    errors.push(`${slug}.astro: no repo="..." prop found`);
  } else if (m[1] !== expected) {
    errors.push(`${slug}.astro: repo="${m[1]}" ≠ github "${expected}" (repo renamed?)`);
  }
}

if (errors.length) {
  console.error('\n✗ Landing page repo validation failed:');
  for (const e of errors) console.error('  - ' + e);
  console.error('\nMake each landing page repo="..." prop match the tool github URL.\n');
  process.exit(1);
}

const count = tools.filter(t => t.page).length;
console.log(`✓ Validated ${count} landing page repo props`);
