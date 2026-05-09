#!/usr/bin/env node
// Generates bootstrap-repos.txt — a hand-pruneable list of repos to tag with
// the borck-edu opt-in topic. Uses the gh CLI so it picks up your stored auth.
//
// Workflow:
//   1. npm run bootstrap:list   →  writes bootstrap-repos.txt
//   2. open it, delete lines for repos you DON'T want on borck.education
//   3. npm run bootstrap:tag    →  applies the topic to remaining lines

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = 'michael-borck';
const OUT_FILE = 'bootstrap-repos.txt';
const TOOLS_JSON = 'src/data/tools.data.json';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function ghJson(args) {
  const out = execFileSync('gh', args, { encoding: 'utf-8', maxBuffer: 16 * 1024 * 1024 });
  return JSON.parse(out);
}

function resolveCurrentName(slug) {
  // Returns { canonical: '<owner>/<name>' } if the repo exists (following
  // GitHub's redirects for renames), or null if it doesn't.
  try {
    const out = execFileSync(
      'gh', ['repo', 'view', slug, '--json', 'nameWithOwner'],
      { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }
    );
    return { canonical: JSON.parse(out).nameWithOwner };
  } catch {
    return null;
  }
}

function loadOnSiteSlugs() {
  const path = join(projectRoot, TOOLS_JSON);
  if (!existsSync(path)) return new Set();
  const tools = JSON.parse(readFileSync(path, 'utf-8'));
  const slugs = new Set();
  for (const t of tools) {
    if (t.github) slugs.add(t.github.replace('https://github.com/', '').toLowerCase());
  }
  return slugs;
}

function main() {
  console.log(`Listing public repos for ${USER} via gh…`);
  const repos = ghJson([
    'repo', 'list', USER,
    '--limit', '500',
    '--visibility', 'public',
    '--no-archived',
    '--source',
    '--json', 'name,description,repositoryTopics,isArchived,isFork,updatedAt',
  ]);

  const onSite = loadOnSiteSlugs();
  const usable = repos
    .filter(r => !r.isArchived && !r.isFork)
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`  ${usable.length} candidates (after stripping archived/forks)`);

  // Drift detection: an on-site slug may not match a current repo because the
  // repo was renamed (GitHub redirects gracefully) or deleted. Resolve each so
  // the [ON SITE] markers reflect the current canonical name.
  const usableSet = new Set(usable.map(r => `${USER}/${r.name}`.toLowerCase()));
  const aliasMap = new Map();   // current-canonical-slug → original-on-site-slug
  const missing = [];           // on-site slugs that don't resolve at all

  for (const onSiteSlug of onSite) {
    if (usableSet.has(onSiteSlug)) continue;
    const resolved = resolveCurrentName(onSiteSlug);
    if (!resolved) {
      missing.push(onSiteSlug);
    } else {
      aliasMap.set(resolved.canonical.toLowerCase(), onSiteSlug);
    }
  }

  const directHits = [...onSite].filter(s => usableSet.has(s)).length;
  console.log(`  ${directHits} on-site repos matched by current name`);
  if (aliasMap.size) console.log(`  ${aliasMap.size} on-site repos renamed since`);
  if (missing.length) console.log(`  ${missing.length} on-site repos missing entirely`);

  const lines = [];
  lines.push(`# borck.education — bootstrap list`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push(`#`);
  lines.push(`# Delete lines for repos you DON'T want tagged with 'borck-edu'.`);
  lines.push(`# Lines starting with '#' and blank lines are ignored.`);
  lines.push(`# When done:  npm run bootstrap:tag`);
  lines.push(`#`);
  lines.push(`# Inline markers:`);
  lines.push(`#   [ON SITE]              already in src/data/tools.data.json`);
  lines.push(`#   [RENAMED FROM <old>]   on-site entry's repo was renamed to this name`);

  if (missing.length) {
    lines.push(`#`);
    lines.push(`# ⚠ on-site entries that no longer resolve on GitHub (deleted or now private):`);
    for (const m of missing) lines.push(`#   ${m}`);
  }

  lines.push('');

  // Width of the longest slug, for aligning trailing comments.
  const maxSlugLen = usable.reduce(
    (m, r) => Math.max(m, `${USER}/${r.name}`.length), 0
  );

  for (const r of usable) {
    const slug = `${USER}/${r.name}`;
    const slugLc = slug.toLowerCase();
    let mark = '';
    if (onSite.has(slugLc)) {
      mark = '[ON SITE]';
    } else if (aliasMap.has(slugLc)) {
      const original = aliasMap.get(slugLc).replace(`${USER}/`, '');
      mark = `[RENAMED FROM ${original}]`;
    }
    if (mark) {
      lines.push(`${slug.padEnd(maxSlugLen)}  # ${mark}`);
    } else {
      lines.push(slug);
    }
  }

  const outPath = join(projectRoot, OUT_FILE);
  writeFileSync(outPath, lines.join('\n'));
  console.log(`Wrote ${OUT_FILE} (${usable.length} repos)`);
  console.log('');
  console.log('Next: open the file, delete blocks for repos you DON\'T want, then:');
  console.log('  npm run bootstrap:tag');
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
