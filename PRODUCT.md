# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Native ES modules + Web Components, no build step, no dependencies. Split into
per-component files under `src/components/`, logic under `src/lib/`, split CSS
under `src/styles/`. Served as static files (podman + static-web-server). Confirmed by the
user, who asked for a maintainable component split rather than one large HTML
file. No backend: `schulferien-api.de` sends `Access-Control-Allow-Origin: *`.

## Users

German general public, on a laptop or desktop, wanting a fast answer to a
specific question: *who is on school holidays, and when?* Parents and relatives
planning childcare and travel, pupils, teachers, club and childcare organisers,
journalists. Secondary: someone scanning the shape of the whole school year
across all 16 states at once.

## Product Purpose

Show the German school-holiday landscape for a whole year in one view: a
16-state × 365-day ribbon for when, and a map for where. Success is answering
"who is off, when" in a couple of seconds without reading a table.

## Positioning

One scrolling ribbon of days wired to one map, driven by a single hover: the
vertical cursor over the band is the shared date for both views, and a holiday
break names itself inside its own bar wherever you have scrolled to. It refuses
the squeeze-a-year-onto-one-screen heatmap and the per-state accordion.

## Operating Context

- Data: `https://schulferien-api.de` (`/api/v1/{year}`, years 2022–2029),
  fields `start`, `end`, `stateCode`, `name`, `name_cp`.
- Holidays are periods (`Osterferien`, `Sommerferien`, …) plus the single
  `variabler_ferientag`; a period may spill past 31 December.
- Conversations happen in German; holiday names come from the API in German.
- A desktop first impression; phone use is glancing, not planning.

## Capabilities and Constraints

- Year control that scrolls that one ribbon to January of the current year, the
  year before or the year after (clamped to the API's 2022–2029); the edges are
  disabled. No further navigation: the question is "now, soon, or the same time
  last year".
- One continuous ribbon: 16 rows (one per Bundesland) at a fixed 20px per day,
  running unbroken across the whole offered span (one year either side of today),
  opened centred on today. December and the following January share a screen, and
  a holiday that crosses the year boundary is a single bar. Individual days get a
  column each, a day number, and weekend shading; holiday periods are spans
  coloured by type with their name inside; the pointer line follows the cursor
  and reports the date.
- Map of the 16 states highlighting those on holiday on the shown date, changing
  as the ribbon is scrubbed; clicking a state selects it. The map is sized from
  its own aspect ratio and clipped to its card, so it always fits at every
  viewport width.
- No date picking — the shown date comes from hovering (or the day-of-year
  fallback for the current date). Confirmed by the user.
- UI language: German only.
- Attribution required for the map geometry (public domain, but credited).

## Brand Commitments

None supplied. The German public-information context asks for plain, precise,
unhyped language.

## Evidence on Hand

- Live API, verified reachable and CORS-open.
- Map geometry: `isellsoap/deutschlandGeoJSON` (Unlicense / public domain),
  reprojected to SVG by `scripts/build-map.py`.
- No logos, testimonials, or claims; none may be invented.

## Product Principles

1. One date, two views: the ribbon and the map always agree.
2. Density is the feature — the whole year must be readable at once.
3. German, plain, unembellished; no marketing voice.
4. Hover answers; click focuses. Nothing is hidden behind a menu.
5. Colour is information, never decoration.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast ≥ 4.5:1, keyboard access to the ribbon cursor and to
each state, visible focus, holiday type conveyed by text as well as colour
(legend, list, and accessible names), and `prefers-reduced-motion` respected.
