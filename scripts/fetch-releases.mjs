#!/usr/bin/env node
// Fetches latest GitHub release assets for repos with platform downloads.
// Writes public/releases.json so the site never calls the GitHub API at runtime.

const repos = [
  'michael-borck/curriculum-curator',
  'michael-borck/talk-buddy',
  'michael-borck/study-buddy',
  'michael-borck/deep-talk',
  'michael-borck/document-lens',
  'michael-borck/career-compass',
  'michael-borck/insight-lens',
  'michael-borck/venture-lab',
  'michael-borck/mark-mate',
  'michael-borck/cite-sight',
];

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
  console.log('Fetching latest releases...');
  const releases = {};
  for (const repo of repos) {
    const data = await fetchRelease(repo);
    if (data) {
      releases[repo] = data;
      const platforms = Object.keys(data).join(', ');
      console.log(`  ✓ ${repo}: ${platforms}`);
    } else {
      console.log(`  - ${repo}: no platform assets`);
    }
  }

  const { writeFileSync, mkdirSync } = await import('node:fs');
  const { join } = await import('node:path');
  const outDir = join(import.meta.dirname, '..', 'public');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'releases.json'), JSON.stringify(releases, null, 2));
  console.log(`Wrote public/releases.json (${Object.keys(releases).length} repos)`);
}

main();
