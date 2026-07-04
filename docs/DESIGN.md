# Home page design (July 2026)

Decision from a 4-variant UI prototype (guided shelves / library catalog /
editorial / refined dark "command deck"), iterated with Michael. **Guided
shelves won** — light theme, educator-first language.

## Structure

1. **Hero row** — pitch copy left; a rotating *spotlight* slider right
   (image-dominant slides, caption overlaid on a bottom scrim, 6 s
   auto-advance, pause on hover, dots, reduced-motion respected).
   The spotlight is an **advert, not a catalog**: a hand-picked ordered list
   in `src/data/tools.ts` (`spotlightIds`). Apps without a screenshot show a
   branded monogram tile until `public/screenshots/<id>-1.png` exists.
2. **Search** — filters shelves + "everything else"; shareable via `?q=`.
3. **Goal shelves grouped by audience** — "For your teaching" / "For your
   students" headings; audience is *structure*, not a filter (no pills).
   Dual-purpose apps (lecturer authors → student consumes, e.g. talk-buddy,
   ensayo) appear in both sections via their goal tags. Shelves are
   horizontal-scroll rows; each has a `#<goal>` anchor.
4. **Everything else** — compact grid for untagged/experimental repos
   (tools with `tags: []`), linking to GitHub.

## Deliberate choices

- No hidden-div view swapping (the old home/grid/detail SPA behaviour):
  everything is one scrollable page, so URLs, back button and deep links work.
- The old inline detail panel is gone — cards link straight to the dedicated
  page, live app, or GitHub (`page || web || github`).
- Tool landing pages share the light theme; per-app brand colours kept
  (darkened variants for contrast on light backgrounds).
- Friendly Title Case names on the home page; kebab ids remain the data key.

## Pending / related

- Sync rework: `tools.data.json` should own membership; GitHub refreshes
  metadata only (topics currently out of sync — `borck-edu` vs `edu-tools`).
- lesson-loom: add to data + `spotlightIds` when the repo exists.
- Spotlight screenshots wanted for: playable-lessons, ensayo,
  curriculum-curator, feed-forward (bottom ~30% sits under the caption scrim;
  top-left content crops best).
