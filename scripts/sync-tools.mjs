#!/usr/bin/env node
// Refreshes src/data/tools.data.json metadata from GitHub.
//
// MEMBERSHIP: tools.data.json is the source of truth. This script NEVER adds
// or removes entries — adding a tool to the site is a deliberate edit to the
// manifest. Per entry it only:
//   - re-detects the dedicated page (src/pages/<id>.astro → "page")
//   - fills in a missing shortDesc from the GitHub repo description
//   - warns when the repo can't be found (renamed / private / deleted)
// It also prints repos tagged SUGGEST_TOPIC that aren't in the manifest yet,
// as candidates for you to add.
//
// Any GitHub API failure is non-fatal: the build proceeds with committed data.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = 'michael-borck';
const SUGGEST_TOPIC = 'edu-tools';
const TOOLS_JSON = 'src/data/tools.data.json';
const PAGES_DIR = 'src/pages';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Known fields first (stable diffs); unknown curated fields are preserved
// after them rather than dropped.
const FIELD_ORDER = [
  'id', 'name', 'type', 'tags', 'shortDesc',
  'page', 'github', 'pypi', 'pip', 'web', 'download', 'brand', 'features',
];

function orderFields(obj) {
  const out = {};
  for (const k of FIELD_ORDER) if (obj[k] !== undefined) out[k] = obj[k];
  for (const k of Object.keys(obj)) if (out[k] === undefined) out[k] = obj[k];
  return out;
}

async function ghFetch(url) {
  const headers = {
    'User-Agent': 'borck-education-sync',
    'Accept': 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN) headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

async function fetchAllPublicRepos() {
  const out = [];
  for (let page = 1; ; page++) {
    const batch = await ghFetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=public&page=${page}`
    );
    if (!batch.length) break;
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

function detectPage(slug) {
  const file = join(projectRoot, PAGES_DIR, `${slug}.astro`);
  return existsSync(file) ? `/${slug}/` : undefined;
}

async function main() {
  const toolsPath = join(projectRoot, TOOLS_JSON);
  const tools = JSON.parse(readFileSync(toolsPath, 'utf-8'));

  let repos = [];
  try {
    console.log(`Fetching public repos for ${USER}…`);
    repos = await fetchAllPublicRepos();
  } catch (e) {
    console.warn(`  ⚠ GitHub API unavailable (${e.message}) — keeping ${TOOLS_JSON} as committed.`);
    return;
  }
  const byUrl = new Map(repos.map(r => [r.html_url.toLowerCase(), r]));

  let changed = false;
  for (const t of tools) {
    // Auto-field: dedicated page detection.
    const page = detectPage(t.id);
    if (page && t.page !== page) { t.page = page; changed = true; }
    if (!page && t.page) { delete t.page; changed = true; }

    if (!t.github) continue;
    const repo = byUrl.get(t.github.toLowerCase());
    if (!repo) {
      console.warn(`  ⚠ '${t.id}': repo not found on GitHub (renamed, private or deleted?) — keeping entry.`);
      continue;
    }
    // Fill missing description from GitHub; never overwrite curated copy.
    if ((!t.shortDesc || /needs description/i.test(t.shortDesc)) && repo.description) {
      t.shortDesc = repo.description;
      changed = true;
      console.log(`  ~ '${t.id}': shortDesc filled from GitHub.`);
    }
  }

  // Candidates: tagged repos not yet in the manifest. Informational only.
  const known = new Set(tools.filter(t => t.github).map(t => t.github.toLowerCase()));
  const candidates = repos.filter(r =>
    !r.archived && (r.topics || []).includes(SUGGEST_TOPIC) && !known.has(r.html_url.toLowerCase())
  );
  if (candidates.length) {
    console.log(`\n  ${candidates.length} repos tagged '${SUGGEST_TOPIC}' are not in ${TOOLS_JSON} (add manually if wanted):`);
    for (const r of candidates) console.log(`    + ${r.name}${r.description ? ` — ${r.description}` : ''}`);
    console.log('');
  }

  if (changed) {
    writeFileSync(toolsPath, JSON.stringify(tools.map(orderFields), null, 2) + '\n');
    console.log(`Wrote ${TOOLS_JSON} (${tools.length} tools).`);
  } else {
    console.log(`${TOOLS_JSON} unchanged (${tools.length} tools).`);
  }
}

main().catch(e => {
  // Never fail the build over a sync problem — the committed manifest is valid.
  console.warn(`  ⚠ sync-tools: ${e.message} — keeping ${TOOLS_JSON} as committed.`);
});
