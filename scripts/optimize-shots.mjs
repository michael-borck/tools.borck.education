#!/usr/bin/env node
// Optimises landing-page screenshots in public/screenshots/.
//
// For each PNG: downscale to at most MAX_WIDTH px wide (only ever shrinks —
// never upscales), then recompress with pngquant. 2000px is 2x the ~968px the
// images display at, so they stay crisp on retina screens while shedding most
// of their weight. Re-running is safe and idempotent (already-small files are
// skipped by pngquant's --skip-if-larger and the resize-only-if-larger guard).
//
// Requires ImageMagick (`magick`) and `pngquant` on PATH:
//   macOS:  brew install imagemagick pngquant
//
// Usage: npm run optimize-shots

import { readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const MAX_WIDTH = 2000;
const QUALITY = '65-92';
const dir = join(import.meta.dirname, '..', 'public', 'screenshots');

function have(cmd) {
  try {
    execFileSync('command', ['-v', cmd], { shell: true, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const missing = ['magick', 'pngquant'].filter(c => !have(c));
if (missing.length) {
  console.error(`✗ Missing required tool(s): ${missing.join(', ')}`);
  console.error('  Install with: brew install imagemagick pngquant');
  process.exit(1);
}

// Skip macOS AppleDouble junk ('._*') that appears on exFAT volumes.
const files = readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png') && !f.startsWith('._')).sort();
if (!files.length) {
  console.log('No PNGs found in public/screenshots/');
  process.exit(0);
}

const kb = n => Math.round(n / 1024);
let totalBefore = 0;
let totalAfter = 0;

for (const name of files) {
  const path = join(dir, name);
  const before = statSync(path).size;
  // Only re-encode with magick when the image is actually too wide — re-running
  // magick on an already-small palette PNG can slightly inflate it.
  const width = parseInt(execFileSync('magick', ['identify', '-format', '%w', path]).toString(), 10);
  if (width > MAX_WIDTH) {
    execFileSync('magick', [path, '-resize', `${MAX_WIDTH}x${MAX_WIDTH}>`, path]);
  }
  try {
    execFileSync('pngquant', [
      '--force', '--ext', '.png', '--quality', QUALITY, '--strip', '--skip-if-larger', path,
    ], { stdio: 'ignore' });
  } catch {
    // pngquant exits non-zero when it can't beat the original below the quality
    // floor; the file is left untouched, which is fine.
  }
  const after = statSync(path).size;
  totalBefore += before;
  totalAfter += after;
  const pct = before ? Math.round((after * 100) / before) : 100;
  console.log(`${name.padEnd(26)} ${String(kb(before)).padStart(6)} KB -> ${String(kb(after)).padStart(5)} KB  (${pct}%)`);
}

const pct = totalBefore ? Math.round((totalAfter * 100) / totalBefore) : 100;
console.log(`\nTotal: ${kb(totalBefore)} KB -> ${kb(totalAfter)} KB  (${pct}%)`);
