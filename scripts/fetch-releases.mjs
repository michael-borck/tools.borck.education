#!/usr/bin/env node
// Fetches latest GitHub release assets for tools that have a landing page.
//
// (a) The repo list is DERIVED from src/data/tools.data.json — any tool with
//     both `page` (a landing page) and `github` is fetched automatically, so
//     adding a new desktop app never requires editing this file.
//
// (b) Before fetching, validates that each landing page's hard-coded
//     repo="owner/name" prop matches the tool's `github` URL. The runtime
//     lookup in public/app-landing.js is an EXACT string match and does not
//     follow GitHub's rename redirects, so a renamed repo would silently break
//     the download buttons. A mismatch fails the build instead.
//
// Writes public/releases.json so the site never calls the GitHub API at runtime.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');

// Extract "owner/name" from a github.com URL (tolerates trailing path / .git).
function ownerRepo(githubUrl) {
  const m = /github\.com\/([^/]+\/[^/#?]+)/.exec(githubUrl || '');
  return m ? m[1].replace(/\.git$/, '') : null;
}

function loadTools() {
  return JSON.parse(readFileSync(join(root, 'src/data/tools.data.json'), 'utf8'));
}

// (b) Fail the build if a landing page's repo prop drifts from tools.data.json.
function validateLandingPages(tools) {
  const errors = [];
  const landing = tools.filter(t => t.page);
  for (const t of landing) {
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
    console.error('\n✗ Landing page / repo validation failed:');
    for (const e of errors) console.error('  - ' + e);
    console.error('\nMake each landing page repo="..." prop match the tool github URL.\n');
    process.exit(1);
  }
  console.log(`✓ Validated ${landing.length} landing page repo props`);
}

// (a) Derive the fetch list: every tool with a landing page + github.
function reposToFetch(tools) {
  const set = new Set();
  for (const t of tools) {
    if (!t.page) continue;
    const r = ownerRepo(t.github);
    if (r) set.add(r);
  }
  return [...set];
}

async function fetchRelease(repo) {
  const url = `https://api.github.com/repos/${repo}/releases/latest`;
  const headers = { 'User-Agent': 'borck-education-build' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`  ⚠ ${repo}: HTTP ${res.status}`);
      return null;
    }
    const data = await res.json();
    const assets = data.assets || [];

    const win = assets.find(a => /setup.*\.exe$/i.test(a.name))
      || assets.find(a => /\.exe$/i.test(a.name))
      || assets.find(a => /\.msi$/i.test(a.name));
    const mac = assets.find(a => /arm64.*\.dmg$/i.test(a.name))
      || assets.find(a => /\.dmg$/i.test(a.name));
    const linux = assets.find(a => /\.AppImage$/i.test(a.name))
      || assets.find(a => /\.deb$/i.test(a.name));

    const result = {};
    if (win) result.win = win.browser_download_url;
    if (mac) result.mac = mac.browser_download_url;
    if (linux) result.linux = linux.browser_download_url;

    return Object.keys(result).length ? result : null;
  } catch (e) {
    console.warn(`  ⚠ ${repo}: ${e.message}`);
    return null;
  }
}

async function main() {
  const tools = loadTools();
  validateLandingPages(tools);
  const repos = reposToFetch(tools);

  console.log(`Fetching latest releases for ${repos.length} repos with landing pages...`);
  const releases = {};
  for (const repo of repos) {
    const data = await fetchRelease(repo);
    if (data) {
      releases[repo] = data;
      console.log(`  ✓ ${repo}: ${Object.keys(data).join(', ')}`);
    } else {
      console.log(`  - ${repo}: no platform assets`);
    }
  }

  const outDir = join(root, 'public');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'releases.json'), JSON.stringify(releases, null, 2));
  console.log(`Wrote public/releases.json (${Object.keys(releases).length} repos)`);
}

main();
