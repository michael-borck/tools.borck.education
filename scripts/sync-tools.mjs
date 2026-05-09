#!/usr/bin/env node
// Syncs src/data/tools.data.json from GitHub.
//
// Source of truth: public repos under USER tagged with the OPT_IN_TOPIC topic.
// Curated fields (shortDesc, type, tags, features, brand, pip, pypi, web, download)
// are preserved across syncs. Auto-fields (id, name, github, page) are refreshed.
// Repos that lose the topic are dropped. New repos are appended at the end.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = 'michael-borck';
const OPT_IN_TOPIC = 'borck-edu';
const TOOLS_JSON = 'src/data/tools.data.json';
const PAGES_DIR = 'src/pages';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Field order in the emitted JSON — keeps diffs stable across runs.
const FIELD_ORDER = [
  'id', 'name', 'type', 'tags', 'shortDesc',
  'page', 'github', 'pypi', 'pip', 'web', 'download', 'brand', 'features',
];

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

function orderFields(obj) {
  const out = {};
  for (const k of FIELD_ORDER) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
}

async function main() {
  const toolsPath = join(projectRoot, TOOLS_JSON);
  const existing = existsSync(toolsPath)
    ? JSON.parse(readFileSync(toolsPath, 'utf-8'))
    : [];

  console.log(`Fetching public repos for ${USER}…`);
  const all = await fetchAllPublicRepos();
  const tagged = all.filter(r =>
    !r.private && !r.archived && (r.topics || []).includes(OPT_IN_TOPIC)
  );
  console.log(`  ${tagged.length} repos tagged '${OPT_IN_TOPIC}' (out of ${all.length} public)`);

  // Safety: when nothing is tagged but we already have curated data, leave it
  // alone. Either the bootstrap hasn't been done, the API is rate-limited, or
  // the topic name is wrong — none of these are intent to wipe the file.
  // Logged loudly so CI still surfaces the state, but exits 0 so the build
  // proceeds with the last-known-good data.
  if (tagged.length === 0 && existing.length > 0) {
    console.warn(
      `\n  ⚠ No public repos under '${USER}' carry the '${OPT_IN_TOPIC}' topic.`
    );
    console.warn(`    Leaving ${TOOLS_JSON} unchanged (${existing.length} tools).`);
    console.warn(`    Bootstrap once with:`);
    for (const t of existing.filter(x => x.github)) {
      const slug = t.github.replace('https://github.com/', '');
      console.warn(`      gh repo edit ${slug} --add-topic ${OPT_IN_TOPIC}`);
    }
    console.warn('');
    return;
  }

  const taggedByUrl = new Map(tagged.map(r => [r.html_url.toLowerCase(), r]));
  const out = [];

  // Pass 1: keep existing entries (preserving order + curation) if still tagged.
  for (const t of existing) {
    if (!t.github) {
      console.warn(`  ! '${t.id}' has no github URL — dropping`);
      continue;
    }
    const url = t.github.toLowerCase();
    const repo = taggedByUrl.get(url);
    if (!repo) {
      console.log(`  - dropped: ${t.name} (no longer tagged '${OPT_IN_TOPIC}')`);
      continue;
    }
    const slug = repo.name;
    const page = detectPage(slug);

    if (t.id !== slug || t.name !== slug) {
      console.log(`  ~ renamed: ${t.name} → ${slug}`);
      const oldPage = detectPage(t.id);
      if (oldPage && !page) {
        console.warn(`    ⚠ dedicated page src/pages/${t.id}.astro exists but new slug '${slug}' has no matching page`);
      }
    }

    const updated = { ...t, id: slug, name: slug, github: repo.html_url };
    if (page) updated.page = page;
    else delete updated.page;

    out.push(updated);
    taggedByUrl.delete(url);
  }

  // Pass 2: append newly-tagged repos (alphabetical for predictability).
  const newRepos = [...taggedByUrl.values()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  for (const repo of newRepos) {
    const slug = repo.name;
    const page = detectPage(slug);
    const stub = {
      id: slug,
      name: slug,
      type: 'Desktop App',
      tags: [],
      shortDesc: repo.description || `${slug} — needs description`,
      github: repo.html_url,
    };
    if (page) stub.page = page;
    out.push(stub);
    console.log(`  + new: ${slug}`);
  }

  const ordered = out.map(orderFields);
  writeFileSync(toolsPath, JSON.stringify(ordered, null, 2) + '\n');
  console.log(`Wrote ${TOOLS_JSON} (${ordered.length} tools)`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
