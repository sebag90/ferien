---
version: 1
slug: "index"
primary_target: "index"
related_targets: []
---

# Surface: index (the whole app)

- **Scope:** the single page of `ferien`, route `index.html`.
- **Visitor mode:** Operate. The visitor completes a task — "who is on school
  holiday, and when". Scanability, precision and known patterns outrank
  expression; brand lives in exact detail.
- **Audience / job:** German general public on a laptop answering a childcare or
  travel question; secondarily scanning the shape of a whole school year.
- **Action:** scrub and scroll the day-level ribbon across the year boundary;
  read the date, the map and the list.
- **Content / proof:** live `schulferien-api.de` data, 16 Bundesländer, seven
  holiday types, 2022–2029; public-domain map geometry.
- **Constraints:** German only; no date picking (hover drives the date); no
  backend; hover + click only.

## Direction contract

THESIS: One unbroken ribbon of days, sixteen Bundesländer tall, scrubbed by the
cursor and mirrored by an equal-area map — true day granularity, scrolled
sideways across a span of years rather than a single year, so December and the
January after it share a screen. It refuses the squeeze-a-year-onto-one-screen
heatmap, the year picker that swaps the dataset at the year boundary, the
per-state accordion, and the card dashboard.

OWN-WORLD: Cool paper greys, one deep blue-black ink, and a single seven-step
seasonal ramp (winter blue → spring green → summer amber → autumn rust → berry)
that is the only colour on the page. Flat rectangles, hairline rules, tabular
figures, generous air. Recognisable with every word removed: a 16-row band of
coloured blocks beside a monochrome map that lights up in the same ramp.

STORY: The visitor sees when every state is off, hovers a week, and reads who is
off that day on both ribbon and map; clicking a state pins its full year.

FIRST VIEWPORT: Slim header (brand left, year control and "Heute" right) over a
two-column grid: the day-level ribbon fills the left ~2/3, opened on today, with
month names and a day-number axis stuck to the left edge and the pointer line
under the cursor; the right third stacks the date readout and the Germany map;
the day's list and legend run full width beneath both. The primary interaction
is the ribbon itself.

FORM: position 1 of 4 — "day-level year window + mirror map, hover-coupled".

seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
