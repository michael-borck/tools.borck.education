# borck.education Hub-and-Spokes Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the `borck.education` property into a small landing-page hub with three satellite sites — `tools.borck.education` (this repo, currently named `borck.education`), `books.borck.education` (existing), `teach.borck.education` (currently `teach.borck.dev`). Then prune the over-tagged `borck-edu` topic so the tools site lists ~30 real tools instead of 105.

**Architecture:** Keep `borck.dev` as the top-level professional hub linking out to all properties. Make `borck.education` a sub-hub (plain HTML, single page, modeled on books.borck.education) with three cards. Keep each spoke single-purpose. The migration uses a *staging-repo trick* to minimize the apex-domain outage during the rename: stand up the hub content in a temporary repo first, do the tools rename (which frees the `borck.education` name), then promote the staging repo. Net outage on `borck.education` is roughly the time between a GitHub repo rename and a Pages config save — typically a few minutes.

**Tech Stack:**
- Astro 5 for `tools.borck.education` (this repo, unchanged)
- Plain HTML/CSS for the new `borck.education` hub (matches `books.borck.education` pattern)
- GitHub Pages + custom domains for hosting
- `gh` CLI for repo operations
- Whatever DNS provider currently hosts `borck.education` and `borck.dev` (user manages directly)

---

## File Structure

### Repos involved

| Current GitHub repo                       | Action                                     | Final state                                  |
|-------------------------------------------|--------------------------------------------|----------------------------------------------|
| `michael-borck/borck.education`           | Rename                                     | `michael-borck/tools.borck.education`        |
| `michael-borck/teach.borck.dev`           | Repurpose CNAME; optionally rename         | Serves `teach.borck.education`               |
| `michael-borck/books.borck.education`     | Unchanged structure; one outbound link N/A | Same                                         |
| `michael-borck/borck.dev`                 | Update outbound links                      | Same                                         |
| `michael-borck/borck-education-hub`       | **NEW (staging name)**                     | Will be renamed to `michael-borck/borck.education` |

### Files this plan creates

- `~/Projects/borck-education-hub/` (temporary local dir; contents listed in Task 3)
  - `index.html` — the hub page
  - `styles.css` — copied/adapted from books site
  - `CNAME` — `borck.education`
  - `favicon.svg` — copied from this repo
  - `.gitignore`, `LICENSE`, `README.md`
- `/Users/michael/Projects/borck.education/scripts/bootstrap-untag-list.mjs`
- `/Users/michael/Projects/borck.education/scripts/bootstrap-untag.mjs`

### Files this plan modifies

- `/Users/michael/Projects/borck.education/public/CNAME` → `tools.borck.education`
- `/Users/michael/Projects/borck.education/astro.config.mjs` → site URL
- `/Users/michael/Projects/borck.education/src/pages/index.astro` → 3× teach.borck.dev → teach.borck.education
- `/Users/michael/Projects/borck.education/package.json` → add `bootstrap:untag:list` + `bootstrap:untag` scripts
- `/Users/michael/Projects/teach.borck.dev/public/CNAME` → `teach.borck.education`
- `/Users/michael/Projects/teach.borck.dev/astro.config.mjs` → site URL (if set)
- `/Users/michael/Projects/borck.dev/src/pages/index.astro` → teach.borck.dev → teach.borck.education

---

## Pre-conditions (confirm before starting)

- `gh` CLI authenticated as `michael-borck` (`gh auth status`)
- DNS provider access available (records will need to be added/changed for `tools.borck.education`, `teach.borck.education`)
- Working tree clean in: `/Users/michael/Projects/borck.education`, `/Users/michael/Projects/teach.borck.dev`, `/Users/michael/Projects/borck.dev`, `/Users/michael/Projects/books/books.borck.education`
- Yesterday's `2dd1862` commit on `main` of this repo has been deployed (CI green)

---

### Task 1: Pre-flight & inventory

**Files:** none modified — inventory only.

- [ ] **Step 1: Confirm clean working trees**

```bash
for d in /Users/michael/Projects/borck.education /Users/michael/Projects/teach.borck.dev /Users/michael/Projects/borck.dev /Users/michael/Projects/books/books.borck.education; do
  echo "=== $d ==="
  git -C "$d" status --short
done
```

Expected: each block empty (or only the gitignored `bootstrap-repos.txt` in this repo).

- [ ] **Step 2: Confirm gh auth**

```bash
gh auth status
```

Expected: "Logged in to github.com account michael-borck (...)"

- [ ] **Step 3: Note the GitHub Pages provisioning IP set**

GitHub Pages apex-domain hosting uses these four `A` records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
Subdomains use `CNAME michael-borck.github.io`. Keep this in front of you for Tasks 2, 7, 10.

---

### Task 2: Add DNS for `tools.borck.education` and `teach.borck.education`

**Files:** none in any repo — DNS provider only.

- [ ] **Step 1: Add CNAME records at the registrar / DNS provider**

| Hostname                      | Type  | Target                       |
|-------------------------------|-------|------------------------------|
| `tools.borck.education`       | CNAME | `michael-borck.github.io.`   |
| `teach.borck.education`       | CNAME | `michael-borck.github.io.`   |

(Both records park at GitHub Pages until a repo claims them via a CNAME file. Adding them now means no DNS-propagation wait when the repos point at them.)

- [ ] **Step 2: Verify DNS resolves (may take a few minutes)**

```bash
dig +short CNAME tools.borck.education
dig +short CNAME teach.borck.education
```

Expected: both resolve to `michael-borck.github.io.` (or a chain ending there).

- [ ] **Step 3: Commit nothing (DNS is external state — record the change in a brief note)**

No git activity for this task.

---

### Task 3: Stage the new hub repo (temporary name)

**Files:**
- Create: `~/Projects/borck-education-hub/index.html`
- Create: `~/Projects/borck-education-hub/styles.css`
- Create: `~/Projects/borck-education-hub/CNAME`
- Create: `~/Projects/borck-education-hub/favicon.svg`
- Create: `~/Projects/borck-education-hub/README.md`
- Create: `~/Projects/borck-education-hub/.gitignore`
- Create: `~/Projects/borck-education-hub/LICENSE` (MIT, matching other repos)

- [ ] **Step 1: Create local directory and initialize git**

```bash
mkdir -p ~/Projects/borck-education-hub
cd ~/Projects/borck-education-hub
git init -b main
```

- [ ] **Step 2: Write `CNAME`**

File: `~/Projects/borck-education-hub/CNAME`

```
borck.education
```

(Single line, no trailing newline issues — `printf` is fine.)

- [ ] **Step 3: Copy favicon from this repo**

```bash
cp /Users/michael/Projects/borck.education/public/favicon.svg ~/Projects/borck-education-hub/favicon.svg
```

- [ ] **Step 4: Write `styles.css`** (adapted from books.borck.education to share visual identity)

File: `~/Projects/borck-education-hub/styles.css`

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --white:    #e8e6e3;
  --gray-1:   #9a9a9e;
  --gray-2:   #5e5e63;
  --gray-3:   #2a2a30;
  --gray-4:   #1e1e23;
  --gray-5:   #16161a;
  --black:    #0a0a0b;
  --accent:      #22c55e;
  --accent-glow: rgba(34, 197, 94, 0.15);
  --font:      'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius:    12px;
}

body {
  font-family: var(--font);
  background: var(--black);
  color: var(--white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

header {
  border-bottom: 1px solid var(--gray-4);
  backdrop-filter: blur(12px);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(10, 10, 11, 0.8);
}
header nav {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header .logo { font-size: 1.1rem; font-weight: 600; letter-spacing: -0.02em; }
header .logo .dot { color: var(--gray-2); }
header .logo .tld { color: var(--accent); }
header nav a.nav-link {
  color: var(--gray-1);
  font-size: 0.85rem;
  font-weight: 500;
}
header nav a.nav-link:hover { color: var(--white); text-decoration: none; }

.hero {
  text-align: center;
  padding: 5rem 2rem 3rem;
  max-width: 760px;
  margin: 0 auto;
}
.hero h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 1rem;
}
.hero p {
  color: var(--gray-1);
  font-size: 1.05rem;
}

.cards {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card {
  background: var(--gray-5);
  border: 1px solid var(--gray-4);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: border-color 0.15s, transform 0.15s;
  display: flex;
  flex-direction: column;
}
.card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}
.card .domain {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--gray-1);
  margin-bottom: 0.85rem;
}
.card p {
  color: var(--gray-1);
  font-size: 0.95rem;
  flex: 1;
}
.card .visit {
  margin-top: 1.25rem;
  font-weight: 500;
}

footer {
  border-top: 1px solid var(--gray-4);
  margin-top: 3rem;
  padding: 2rem;
  text-align: center;
  color: var(--gray-2);
  font-size: 0.85rem;
}
footer a { color: var(--gray-1); }
footer a:hover { color: var(--white); }
```

- [ ] **Step 5: Write `index.html`**

File: `~/Projects/borck-education-hub/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>borck.education</title>
  <meta name="description" content="Educational tools, books, and teaching materials by Michael Borck.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<header>
  <nav>
    <div class="logo">
      borck<span class="dot">.</span><span class="tld">education</span>
    </div>
    <a class="nav-link" href="https://borck.dev">borck.dev</a>
  </nav>
</header>

<section class="hero">
  <h1>Tools, books, and teaching for the AI era.</h1>
  <p>Three projects by Michael Borck — each runnable locally, each open source, each focused on helping educators, students, and curious learners think with AI rather than through it.</p>
</section>

<section class="cards">

  <a class="card" href="https://tools.borck.education">
    <h3>Tools</h3>
    <div class="domain">tools.borck.education</div>
    <p>Privacy-first desktop apps, CLIs, and Python libraries for teaching and learning. Local inference, BYOK or Ollama, no accounts.</p>
    <span class="visit">Visit →</span>
  </a>

  <a class="card" href="https://books.borck.education">
    <h3>Books</h3>
    <div class="domain">books.borck.education</div>
    <p>Books on intentional AI collaboration — methodology, business education, and Python tracks. Free online editions plus print on Amazon.</p>
    <span class="visit">Visit →</span>
  </a>

  <a class="card" href="https://teach.borck.education">
    <h3>Teach</h3>
    <div class="domain">teach.borck.education</div>
    <p>Workshops, courses, and faculty development materials. AI literacy for educators, AI in the curriculum, and pedagogical design.</p>
    <span class="visit">Visit →</span>
  </a>

</section>

<footer>
  <p>Built by Michael Borck · <a href="https://borck.dev">borck.dev</a> · MIT License</p>
</footer>

</body>
</html>
```

- [ ] **Step 6: Write `.gitignore`**

File: `~/Projects/borck-education-hub/.gitignore`

```
.DS_Store
**/.DS_Store
```

- [ ] **Step 7: Write `README.md`**

File: `~/Projects/borck-education-hub/README.md`

```markdown
# borck.education

Single-page hub linking the three educational properties:
- [tools.borck.education](https://tools.borck.education)
- [books.borck.education](https://books.borck.education)
- [teach.borck.education](https://teach.borck.education)

Plain HTML, no build step. Deploys via GitHub Pages.

MIT licensed.
```

- [ ] **Step 8: Copy LICENSE from this repo**

```bash
cp /Users/michael/Projects/borck.education/LICENSE ~/Projects/borck-education-hub/LICENSE 2>/dev/null \
  || cp /Users/michael/Projects/teach.borck.dev/LICENSE ~/Projects/borck-education-hub/LICENSE 2>/dev/null \
  || true
```

If neither has a LICENSE on disk, skip — add later.

- [ ] **Step 9: Verify the hub renders locally**

```bash
cd ~/Projects/borck-education-hub
python3 -m http.server 8765 &
sleep 1
curl -s http://localhost:8765/ | grep -E "(<title>|tools.borck.education|books.borck.education|teach.borck.education)" | head -10
kill %1
```

Expected output: shows `<title>borck.education</title>` and all three subdomain refs.

- [ ] **Step 10: Initial commit + create GitHub repo (under staging name)**

```bash
cd ~/Projects/borck-education-hub
git add .
git commit -m "Initial hub site"
gh repo create michael-borck/borck-education-hub --public --source=. --push
```

Expected: repo created, code pushed.

- [ ] **Step 11: Do NOT enable Pages or set custom domain yet**

The custom-domain config will be set after the repo is renamed to `borck.education` in Task 10. Setting it now would conflict with the still-existing `michael-borck/borck.education` repo.

---

### Task 4: Migrate this repo's CNAME to `tools.borck.education`

**Files:**
- Modify: `/Users/michael/Projects/borck.education/public/CNAME`
- Modify: `/Users/michael/Projects/borck.education/astro.config.mjs`

- [ ] **Step 1: Update the CNAME file**

Replace the entire contents of `/Users/michael/Projects/borck.education/public/CNAME` with:

```
tools.borck.education
```

- [ ] **Step 2: Update the Astro `site` URL**

In `/Users/michael/Projects/borck.education/astro.config.mjs`, change:

```js
site: 'https://borck.education',
```

to:

```js
site: 'https://tools.borck.education',
```

(Used by Astro for canonical URLs in generated HTML, sitemap, and RSS.)

- [ ] **Step 3: Verify build still works locally**

```bash
cd /Users/michael/Projects/borck.education
npm run build 2>&1 | tail -5
```

Expected: `[build] Complete!`

- [ ] **Step 4: Commit (do NOT push yet — push together with link updates in Task 5)**

```bash
cd /Users/michael/Projects/borck.education
git add public/CNAME astro.config.mjs
git commit -m "Switch CNAME to tools.borck.education"
```

---

### Task 5: Update outbound links in this (tools) repo

**Files:**
- Modify: `/Users/michael/Projects/borck.education/src/pages/index.astro`

- [ ] **Step 1: Confirm the three teach references**

```bash
grep -n "teach.borck.dev" /Users/michael/Projects/borck.education/src/pages/index.astro
```

Expected: 3 matching lines (topbar nav, sidebar item, sidebar item type label).

- [ ] **Step 2: Replace all teach.borck.dev → teach.borck.education**

In `/Users/michael/Projects/borck.education/src/pages/index.astro`, replace **all occurrences** of `teach.borck.dev` with `teach.borck.education`. There are 3.

- [ ] **Step 3: Build to verify**

```bash
cd /Users/michael/Projects/borck.education
npm run build 2>&1 | tail -3
grep -c "teach.borck.education" dist/index.html
grep -c "teach.borck.dev" dist/index.html
```

Expected: build complete; 3 occurrences of `teach.borck.education`; 0 occurrences of `teach.borck.dev`.

- [ ] **Step 4: Commit and push (this and Task 4 changes)**

```bash
cd /Users/michael/Projects/borck.education
git add src/pages/index.astro
git commit -m "Point Teaching links at teach.borck.education"
git push origin main
```

CI will rebuild. The site will deploy to whatever Pages says the custom domain is — currently still `borck.education`. The CNAME *file* now says `tools.borck.education`, which is a hint to GitHub but the repo's Pages **settings** still need updating.

---

### Task 6: Update GitHub Pages custom domain on this repo, verify, and rename

**Files:** none — GitHub UI / API only.

- [ ] **Step 1: Update Pages custom domain via gh API**

```bash
gh api -X PUT repos/michael-borck/borck.education/pages \
  -f cname=tools.borck.education \
  -F https_enforced=true
```

Expected: 200/204 OK or empty body.

- [ ] **Step 2: Wait for HTTPS provisioning (1-15 min) and verify**

```bash
# Re-run every couple minutes until HTTP/200 returned:
curl -sI https://tools.borck.education/ | head -1
```

Expected eventually: `HTTP/2 200`. Until then expect `404` or SSL handshake errors.

- [ ] **Step 3: Visual smoke check**

Open `https://tools.borck.education/` in a browser. Confirm:
- The full grid of tools renders
- Sidebar Teaching link points at `teach.borck.education` (404 expected — teach hasn't moved yet)
- Topbar nav Teaching link points at `teach.borck.education`

- [ ] **Step 4: Note that `borck.education` is now uncovered**

`borck.education` apex domain still has DNS records pointing to GitHub Pages, but no repo's CNAME file claims it anymore. Visiting `https://borck.education/` will now 404. This window stays open until Task 10 — typically ~5-15 minutes if you move directly through Tasks 7-10.

- [ ] **Step 5: Rename the repo**

```bash
gh repo rename tools.borck.education --repo michael-borck/borck.education --yes
```

Expected: repo URL changes to `https://github.com/michael-borck/tools.borck.education`. GitHub auto-redirects from the old URL.

- [ ] **Step 6: Update local git remote**

```bash
cd /Users/michael/Projects/borck.education
git remote set-url origin https://github.com/michael-borck/tools.borck.education.git
git remote -v
```

Expected: origin points at the new URL.

- [ ] **Step 7: (Optional) Rename local directory to match**

```bash
# Skip this if you have other tools (Conductor, IDE projects) pinned to the old path.
# Otherwise:
# cd ~/Projects && mv borck.education tools.borck.education && cd tools.borck.education
```

(Plan continues using `/Users/michael/Projects/borck.education` for paths because the user controls renaming.)

---

### Task 7: Migrate teach repo's CNAME to `teach.borck.education`

**Files:**
- Modify: `/Users/michael/Projects/teach.borck.dev/public/CNAME`
- Modify: `/Users/michael/Projects/teach.borck.dev/astro.config.mjs` (if `site` is set)

- [ ] **Step 1: Update CNAME file**

Replace contents of `/Users/michael/Projects/teach.borck.dev/public/CNAME` with:

```
teach.borck.education
```

- [ ] **Step 2: Check whether astro.config has a site URL to update**

```bash
grep -n "site:" /Users/michael/Projects/teach.borck.dev/astro.config.mjs
```

If there's a `site: 'https://teach.borck.dev'` line, change it to `site: 'https://teach.borck.education'`. If not, skip.

- [ ] **Step 3: Sweep for any hardcoded teach.borck.dev links**

```bash
grep -rn "teach.borck.dev" /Users/michael/Projects/teach.borck.dev/src /Users/michael/Projects/teach.borck.dev/public 2>/dev/null
```

For each match (excluding the CNAME we already updated, which now has the new value), update to `teach.borck.education`.

- [ ] **Step 4: Build to verify**

```bash
cd /Users/michael/Projects/teach.borck.dev
npm run build 2>&1 | tail -3
```

Expected: build completes.

- [ ] **Step 5: Commit and push**

```bash
cd /Users/michael/Projects/teach.borck.dev
git add -A
git commit -m "Switch CNAME to teach.borck.education"
git push origin main
```

- [ ] **Step 6: Update Pages custom domain via gh API**

```bash
gh api -X PUT repos/michael-borck/teach.borck.dev/pages \
  -f cname=teach.borck.education \
  -F https_enforced=true
```

- [ ] **Step 7: Wait for HTTPS and verify**

```bash
curl -sI https://teach.borck.education/ | head -1
```

Expected eventually: `HTTP/2 200`.

- [ ] **Step 8: (Optional) Rename teach GitHub repo**

```bash
# Cosmetic — repo name no longer matches the domain it serves.
# Skip if you don't care; teach.borck.dev as a repo name still works.
gh repo rename teach.borck.education --repo michael-borck/teach.borck.dev --yes
cd /Users/michael/Projects/teach.borck.dev
git remote set-url origin https://github.com/michael-borck/teach.borck.education.git
```

---

### Task 8: Promote staging hub repo to `borck.education`

**Files:** none — GitHub repo settings + DNS.

- [ ] **Step 1: Confirm the old `borck.education` repo name is now free**

```bash
gh repo view michael-borck/borck.education 2>&1 | head -3
```

Expected: error like `Could not resolve to a Repository` (the rename in Task 6 freed the name).

- [ ] **Step 2: Rename the staging repo**

```bash
gh repo rename borck.education --repo michael-borck/borck-education-hub --yes
```

- [ ] **Step 3: Update local git remote on the staging dir**

```bash
cd ~/Projects/borck-education-hub
git remote set-url origin https://github.com/michael-borck/borck.education.git
git remote -v
```

- [ ] **Step 4: Enable Pages with custom domain**

```bash
# First enable Pages for the repo (from main branch, root):
gh api -X POST repos/michael-borck/borck.education/pages \
  -f source[branch]=main \
  -f source[path]=/

# Then set custom domain:
gh api -X PUT repos/michael-borck/borck.education/pages \
  -f cname=borck.education \
  -F https_enforced=true
```

If the first call returns 409 (already exists), continue to the second. If the second returns 422 (HTTPS not provisioned yet), wait 2 minutes and re-run with `https_enforced=false`, then re-run with `https_enforced=true` once HTTPS is up.

- [ ] **Step 5: Wait for HTTPS provisioning and verify**

```bash
# Poll until HTTP/200:
curl -sI https://borck.education/ | head -1
```

Expected eventually: `HTTP/2 200`.

- [ ] **Step 6: Visual smoke check**

Open `https://borck.education/` in a browser. Confirm:
- Hub renders with three cards (Tools, Books, Teach)
- All three card links navigate to working subdomains
- Footer link to `borck.dev` works

- [ ] **Step 7: (Optional) Rename local directory**

```bash
# mv ~/Projects/borck-education-hub ~/Projects/borck.education
# (if it doesn't conflict with the still-extant ~/Projects/borck.education from this repo)
```

Skip if there's a path conflict — keep the staging dir name locally.

---

### Task 9: Update outbound links in `borck.dev`

**Files:**
- Modify: `/Users/michael/Projects/borck.dev/src/pages/index.astro`

- [ ] **Step 1: Locate the teach link**

```bash
grep -n "teach.borck" /Users/michael/Projects/borck.dev/src/pages/index.astro
```

Expected: 2 lines (one `href`, one display text), per yesterday's inventory.

- [ ] **Step 2: Update both occurrences**

In `/Users/michael/Projects/borck.dev/src/pages/index.astro`, replace `teach.borck.dev` with `teach.borck.education` in both the `href` and the display text.

- [ ] **Step 3: (Optional) Add a consulting card if you want to start linking borck.consulting from the hub**

Skip if not ready. If ready, mirror the existing card pattern with `https://borck.consulting`.

- [ ] **Step 4: Build to verify**

```bash
cd /Users/michael/Projects/borck.dev
npm run build 2>&1 | tail -3
```

Expected: build completes.

- [ ] **Step 5: Commit and push**

```bash
cd /Users/michael/Projects/borck.dev
git add src/pages/index.astro
git commit -m "Update teach link to teach.borck.education"
git push origin main
```

---

### Task 10: Verify books.borck.education needs no changes

**Files:** none modified — verification only.

- [ ] **Step 1: Confirm books has no teach.borck.dev references**

```bash
grep -n "teach.borck.dev" /Users/michael/Projects/books/books.borck.education/index.html
```

Expected: no output (matches yesterday's inventory).

- [ ] **Step 2: Confirm the borck.education link in books still resolves**

```bash
curl -sI https://borck.education/ | head -1
```

Expected: `HTTP/2 200` (Task 8 made this true).

No commit for this task.

---

### Task 11: Write `bootstrap-untag-list.mjs`

**Files:**
- Create: `/Users/michael/Projects/borck.education/scripts/bootstrap-untag-list.mjs`
- Modify: `/Users/michael/Projects/borck.education/package.json`
- Modify: `/Users/michael/Projects/borck.education/.gitignore`

- [ ] **Step 1: Write the list script**

File: `/Users/michael/Projects/borck.education/scripts/bootstrap-untag-list.mjs`

```javascript
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
```

- [ ] **Step 2: Add to .gitignore**

Append a line to `/Users/michael/Projects/borck.education/.gitignore`:

```
bootstrap-untag.txt
```

- [ ] **Step 3: No commit yet — paired with Task 12.**

---

### Task 12: Write `bootstrap-untag.mjs`

**Files:**
- Create: `/Users/michael/Projects/borck.education/scripts/bootstrap-untag.mjs`
- Modify: `/Users/michael/Projects/borck.education/package.json`

- [ ] **Step 1: Write the untag script**

File: `/Users/michael/Projects/borck.education/scripts/bootstrap-untag.mjs`

```javascript
#!/usr/bin/env node
// Reads bootstrap-untag.txt and removes the 'borck-edu' topic from each
// remaining repo via gh repo edit. Idempotent.

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOPIC = 'borck-edu';
const IN_FILE = 'bootstrap-untag.txt';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function parseList(text) {
  return text
    .split('\n')
    .map(l => l.split('#')[0].trim())
    .filter(l => l && /^[\w.-]+\/[\w.-]+$/.test(l));
}

function untag(slug) {
  try {
    execFileSync('gh', ['repo', 'edit', slug, '--remove-topic', TOPIC], {
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
    console.error(`Missing ${IN_FILE}. Run 'npm run bootstrap:untag:list' first.`);
    process.exit(1);
  }

  const slugs = parseList(readFileSync(inPath, 'utf-8'));
  if (slugs.length === 0) {
    console.error(`No repos parsed from ${IN_FILE}.`);
    process.exit(1);
  }

  console.log(`Removing '${TOPIC}' from ${slugs.length} repos…`);
  let okCount = 0;
  const failed = [];
  for (const slug of slugs) {
    process.stdout.write(`  ${slug} … `);
    const res = untag(slug);
    if (res.ok) { console.log('ok'); okCount++; }
    else { console.log(`FAILED — ${res.err}`); failed.push({ slug, err: res.err }); }
  }

  console.log('');
  console.log(`Done: ${okCount}/${slugs.length} untagged.`);
  if (failed.length) {
    console.log(`Failed:`);
    for (const f of failed) console.log(`  ${f.slug}: ${f.err}`);
    process.exit(1);
  }
  console.log(`Next: npm run sync (or wait for the daily cron)`);
}

try { main(); } catch (e) {
  if (e.code === 'ENOENT') {
    console.error('Error: gh CLI not found. Install: https://cli.github.com/');
    process.exit(1);
  }
  console.error(e.message || e);
  process.exit(1);
}
```

- [ ] **Step 2: Add npm scripts**

In `/Users/michael/Projects/borck.education/package.json`, the `scripts` section currently looks like:

```json
"scripts": {
  "dev": "astro dev",
  "sync": "node scripts/sync-tools.mjs",
  "bootstrap:list": "node scripts/bootstrap-list.mjs",
  "bootstrap:tag": "node scripts/bootstrap-tag.mjs",
  "fetch-releases": "node scripts/fetch-releases.mjs",
  "build": "node scripts/sync-tools.mjs && node scripts/fetch-releases.mjs && astro build",
  "preview": "astro preview"
},
```

Add two entries after `bootstrap:tag`:

```json
"bootstrap:untag:list": "node scripts/bootstrap-untag-list.mjs",
"bootstrap:untag": "node scripts/bootstrap-untag.mjs",
```

Final `scripts` section:

```json
"scripts": {
  "dev": "astro dev",
  "sync": "node scripts/sync-tools.mjs",
  "bootstrap:list": "node scripts/bootstrap-list.mjs",
  "bootstrap:tag": "node scripts/bootstrap-tag.mjs",
  "bootstrap:untag:list": "node scripts/bootstrap-untag-list.mjs",
  "bootstrap:untag": "node scripts/bootstrap-untag.mjs",
  "fetch-releases": "node scripts/fetch-releases.mjs",
  "build": "node scripts/sync-tools.mjs && node scripts/fetch-releases.mjs && astro build",
  "preview": "astro preview"
},
```

- [ ] **Step 3: Verify list script runs**

```bash
cd /Users/michael/Projects/borck.education
npm run bootstrap:untag:list
head -20 bootstrap-untag.txt
wc -l bootstrap-untag.txt
```

Expected: ~110 lines (105 tagged + ~5 header). Each line shows `michael-borck/<name>  # <description>`.

- [ ] **Step 4: Commit and push**

```bash
cd /Users/michael/Projects/borck.education
git add scripts/bootstrap-untag-list.mjs scripts/bootstrap-untag.mjs package.json .gitignore
git commit -m "Add bootstrap-untag pair for pruning borck-edu topic"
git push origin main
```

---

### Task 13: Run untag flow to prune `borck-edu` to actual tools

**Files:**
- `/Users/michael/Projects/borck.education/bootstrap-untag.txt` (working file, gitignored)

- [ ] **Step 1: Generate the untag candidate list**

```bash
cd /Users/michael/Projects/borck.education
npm run bootstrap:untag:list
```

- [ ] **Step 2: Edit the list — DELETE lines for repos that ARE real tools**

```bash
$EDITOR bootstrap-untag.txt
```

Open the file. **Delete every line** that points at a *real tool* (something runnable: a desktop app, CLI, library, web app you actively maintain). What survives the prune will be untagged.

Expected to delete (these stay tagged): roughly the original 22 from yesterday's tools.data.json, plus any other repos you genuinely consider tools (e.g. `electron-kit` if it's a template you use, etc.).

Expected to keep (these get untagged): workshops, courses, books, satellite websites (`borck.dev`, `teach.borck.dev`, `books.borck.education`, etc.), seminar handouts, demos that aren't tools.

Target end state: ~20-35 lines remaining in the file = ~20-35 untaggings happen.

- [ ] **Step 3: Sanity-check the file before running**

```bash
grep -cE "^michael-borck/" bootstrap-untag.txt
```

Expected: a number you're comfortable with. If it's 0 or close to 105, re-edit.

- [ ] **Step 4: Run the untag**

```bash
cd /Users/michael/Projects/borck.education
npm run bootstrap:untag
```

Expected: each remaining line printed as `michael-borck/<name> … ok`. Any failures listed at the end.

- [ ] **Step 5: Sync the site to reflect the pruned tagging**

```bash
cd /Users/michael/Projects/borck.education
npm run sync
git diff src/data/tools.data.json | head -40
```

Expected: a diff showing the dropped tools (the ones you just untagged).

- [ ] **Step 6: Build to verify**

```bash
npm run build 2>&1 | tail -3
node -e "console.log(require('./src/data/tools.data.json').length + ' tools')"
```

Expected: build complete; tool count down to ~25-35 from 105.

- [ ] **Step 7: Commit and push**

```bash
git add src/data/tools.data.json
git commit -m "Prune borck-edu topic to real tools"
git push origin main
```

CI will redeploy. Visit `https://tools.borck.education/` — the grid should now show only real tools.

---

## Post-migration verification (do all of these)

- [ ] `https://borck.education/` returns 200 and shows the three-card hub
- [ ] `https://tools.borck.education/` returns 200 and shows the curated tools grid
- [ ] `https://books.borck.education/` returns 200 and the nav-link to `borck.education` works
- [ ] `https://teach.borck.education/` returns 200
- [ ] `https://borck.dev/` returns 200 and the teach link points at `teach.borck.education`
- [ ] CI builds on the renamed `tools.borck.education` repo are green (`gh run list --repo michael-borck/tools.borck.education --limit 3`)
- [ ] Daily cron on the renamed repo continues to fire (next morning, check `gh run list`)
- [ ] `https://teach.borck.dev/` either still resolves (if you didn't remove the DNS) or 404s gracefully — your call whether to keep the old DNS as a redirect

---

## Rollback notes

- **Repo rename rollback:** `gh repo rename` is reversible (`gh repo rename borck.education --repo michael-borck/tools.borck.education`).
- **CNAME file rollback:** edit and push.
- **Pages config rollback:** `gh api -X PUT repos/.../pages -f cname=<old>`.
- **Untag rollback:** every untag is recoverable by re-running `bootstrap-tag` with the same slug list.

The hub repo is the only piece that requires creation rather than a config change. If you abandon mid-migration, delete `michael-borck/borck-education-hub` (or the renamed `borck.education`), restore the original CNAME on this repo, and re-point the Pages custom domain back to `borck.education`.

---

## Self-review notes

- All five user-stated steps are covered: rename (Task 6), teach migration (Tasks 7-8), new hub (Tasks 3+8), prune topic (Tasks 11-13), update outbound links (Tasks 5, 7, 9, 10).
- DNS sequencing avoids the longest possible outage by pre-staging the hub and pre-adding DNS records.
- Rollback path documented for every destructive step.
- Each task's commands are concrete; no "appropriately handle X" placeholders.
