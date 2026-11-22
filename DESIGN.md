---
name: Schulferien in Deutschland
description: The German school year as one scrolling ribbon of days, mirrored by a map.
colors:
  paper: "oklch(0.972 0.005 255)"
  surface: "oklch(0.995 0.002 255)"
  surface-sunken: "oklch(0.955 0.006 255)"
  ink: "oklch(0.235 0.022 258)"
  ink-muted: "oklch(0.44 0.02 258)"
  ink-faint: "oklch(0.52 0.016 258)"
  rule: "oklch(0.905 0.008 258)"
  rule-strong: "oklch(0.84 0.012 258)"
  holiday-winter: "oklch(0.56 0.15 255)"
  holiday-oster: "oklch(0.62 0.15 150)"
  holiday-pfingsten: "oklch(0.66 0.11 195)"
  holiday-sommer: "oklch(0.74 0.15 70)"
  holiday-herbst: "oklch(0.64 0.16 45)"
  holiday-weihnachten: "oklch(0.54 0.16 18)"
  holiday-variabel: "oklch(0.6 0.08 300)"
  holiday-winter-ink: "oklch(0.26 0.1 255)"
  holiday-oster-ink: "oklch(0.27 0.1 150)"
  holiday-pfingsten-ink: "oklch(0.28 0.08 195)"
  holiday-sommer-ink: "oklch(0.38 0.1 70)"
  holiday-herbst-ink: "oklch(0.28 0.11 45)"
  holiday-weihnachten-ink: "oklch(0.24 0.1 18)"
  holiday-variabel-ink: "oklch(0.28 0.07 300)"
  map-empty: "oklch(0.915 0.008 258)"
  map-empty-hover: "oklch(0.86 0.01 258)"
  focus: "oklch(0.52 0.16 258)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  brand:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  subhead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.09em"
    fontFeature: "tabular-nums"
rounded:
  xs: "3px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "999px"
spacing:
  hairline: "2px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "30px"
  day-width: "20px"
  row-height: "26px"
  axis-height: "46px"
  top-card-height: "calc(16px + var(--axis-h) + 1px + 5px + (var(--row-h) * 16) + 30px + 12px + 12px)"
components:
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "18px 22px 20px"
  ribbon-span:
    rounded: "{rounded.xs}"
    size: "height 62% of a 30px row"
  ribbon-label:
    textColor: "{colors.holiday-sommer-ink}"
    padding: "0 8px"
  month-label:
    textColor: "{colors.ink-faint}"
    backgroundColor: "{colors.surface}"
    padding: "0 10px 0 0"
  holiday-chip:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
  year-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "3px"
  list-row:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "6px 9px"
  inset-panel:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
---

# Design System: Schulferien in Deutschland

## Overview

An **Operate** surface: a tool for answering *who is on school holiday, and
when*. The whole visual system exists to make a sixteen-row calendar readable
at day granularity, and to keep the ribbon and the map reading as one
instrument.

The ribbon is a **window, not a poster**. It renders the whole year at a fixed
20px per day and scrolls sideways, so roughly two months are visible at once and
every single day has its own column, number and weekend shading. It opens
centred on the current date.

The two top cards are **the same height by construction** — one token, `--tl-h`
— and each spends that height on the one thing it is for: the ribbon on its
days, the map card on nothing but the map. The date readout lives with the list
below, so no chrome steals height from Germany.

Color strategy is **Restrained**: cool paper neutrals carry the page, and a
single seven-step seasonal ramp is the only colour in the interface. Every hue
on screen is information — there is no decorative colour, no gradient, no
illustration, no icon set beyond two chevrons and the brand mark.

Type is one family, **Archivo** (self-hosted variable WOFF2, latin + latin-ext),
across weights; numbers are tabular so days and dates align in columns.

## Colors

Neutrals are cool and slightly blue (hue 255–258), never cream: a desk under
daylight, not parchment. `paper` is the page, `surface` the cards,
`surface-sunken` the row-hover and inset fills, `rule`/`rule-strong` the
hairlines.

The **seasonal ramp** is the semantic core. Each step names a holiday period and
is ordered as the periods occur in the year, so adjacent blocks in the ribbon
are adjacent hues:

| Token | Period | Fill | Ink (text on the fill) |
| --- | --- | --- | --- |
| `holiday-winter` | Winterferien | `oklch(0.56 0.15 255)` | `oklch(0.26 0.1 255)` |
| `holiday-oster` | Osterferien | `oklch(0.62 0.15 150)` | `oklch(0.27 0.1 150)` |
| `holiday-pfingsten` | Pfingstferien | `oklch(0.66 0.11 195)` | `oklch(0.28 0.08 195)` |
| `holiday-sommer` | Sommerferien | `oklch(0.74 0.15 70)` | `oklch(0.38 0.1 70)` |
| `holiday-herbst` | Herbstferien | `oklch(0.64 0.16 45)` | `oklch(0.28 0.11 45)` |
| `holiday-weihnachten` | Weihnachtsferien | `oklch(0.54 0.16 18)` | `oklch(0.24 0.1 18)` |
| `holiday-variabel` | Variabler Ferientag | `oklch(0.6 0.08 300)` | `oklch(0.28 0.07 300)` |

Each period has a paired **ink**: the same hue, pushed dark. Period names drawn
*inside* a coloured span use that pair's ink, never white and never grey — so
every label clears contrast on its own fill without leaving the hue.

The ramp holds roughly one lightness band (0.54–0.74) and one chroma band
(0.08–0.16) so no period dominates; `sommer` is the deliberate exception,
lightest and widest, because it is the longest and most consequential break.

`map-empty` / `map-empty-hover` are the unlit map; `focus` is the single
system-interactive hue and appears only in focus rings.

**The Colour-Is-Information Rule.** A hue may only appear because data put it
there. `focus` is the only exception, and it never appears at rest.

## Typography

One family, **eight documented steps** — every `font-size` in the CSS is one of
these tokens (`--text-*` in `tokens.css`), never a literal:

| Step | Token | Size | Use |
| --- | --- | --- | --- |
| Display | `--text-display` | `1.3125rem` (21px) | The date readout above the map. |
| Brand | `--text-brand` | `1.0625rem` (17px) | The wordmark. |
| Body | `--text-body` | `1rem` (16px) | Prose, footer links, the clear button. |
| Title | `--text-title` | `0.9375rem` (15px) | The panel's section heading. |
| Subhead | `--text-subhead` | `0.875rem` (14px) | Selected-state heading, error copy. |
| Label | `--text-label` | `0.8125rem` (13px) | Bundesland names, list items, buttons. |
| Caption | `--text-caption` | `0.75rem` (12px) | Holiday type in a row, date ranges, footer. |
| Micro | `--text-micro` | `0.6875rem` (11px) | Month names, day numbers, legend, chips. |

Display/brand/title/subhead are 600–700 and negative-tracked; label/caption are
400–500; micro is 600 and positive-tracked uppercase where it labels a group.
Headings use `text-wrap: balance`; all numerals are `tabular-nums`.

**The One-Family Rule.** No second face, no display serif, no monospace
costume. Hierarchy comes from size, weight, case and tracking.

## Layout

A two-column grid at the top — the year ribbon (`minmax(0, 1fr)`) beside a fixed
sidebar (`clamp(330px, 30vw, 440px)`) holding the map — and a full-width panel
below (`grid-column: 1 / -1`) for the date, the day's list and the legend. Gaps
are `clamp(16px, 1.8vw, 30px)`; the page gutter is `clamp(16px, 2.4vw, 40px)`.

Both top cards are `height: var(--tl-h)`. The token is a `calc()` of the
ribbon's own parts (card padding, `--axis-h`, the axis rule, the plot's padding,
sixteen `--row-h`, fifteen 2px gaps, the scrollbar's 12px, padding again), and
the ribbon's rows are `grid-auto-rows: minmax(0, 1fr)`, so any rounding is
absorbed by the rows and the two cards can never disagree. The width rhymes with
that height: the sidebar is sized so the portrait map is **height**-constrained
and therefore as large as the shared height allows.

### The year window

The ribbon is **one continuous axis**, not a year: it runs from 1 January of the
first offered year to 31 December of the last (one year either side of today,
clamped to the API's 2022–2029), so December and the January after it are on the
same screen and a Weihnachtsferien crossing the boundary is one bar. Every date
is reduced to an absolute day number (`absoluteDayOf`), so the year boundary is
a position on the axis, never a seam.

It measures `--day-w: 20px` per day (`--track-w` is set from that: ~1095 × 20 ≈
22 000px) inside `.tl__scroll`, a horizontal scroll container that also reserves
12px beneath the track for its scrollbar. Two things stick to the left edge while
the days scroll: the Bundesland label column (`--label-w: 176px`) and, inside
each month box, the month name — each carrying its year (`Dezember 2026`,
`Januar 2027`), because a month name alone no longer identifies a month. A third
thing sticks *inside its own span*: the holiday name (see Components).

Rows are `--row-h: 30px` with a 2px gap; the axis above them is
`--axis-h: 54px`, in three rows — month names, day numbers, and the date-chip
line. Below 900px the layout collapses to one column, the map moves first
(`order: -1`), the label column narrows to 76px with codes instead of names, and
the panel stacks heading → detail → list → legend.

The spacing rhythm is tight-within, generous-between: 2px between ribbon rows
and list rows, 14px inside cards, 20–30px between cards.

## Elevation & Depth

A **hybrid**: flat hairlines do the structural work, and one very soft shadow
lifts the cards off the paper. There are no nested cards, no glass, no glow, and
no shadows inside cards.

### Shadow Vocabulary

- **Card** (`0 1px 2px oklch(0.235 0.022 258 / 0.05), 0 14px 30px -22px oklch(0.235 0.022 258 / 0.35)`):
  the only shadow in the system. Every `.tl`, `.map` and `.panel` carries it.
  It has a real y-offset and a wide negative-spread blur; it is never a
  zero-offset halo.

**The One-Shadow Rule.** Depth is a single elevation. A new surface does not get
a new shadow, it gets the card shadow or nothing.

**The One-Height Rule.** The two top cards share `--tl-h`; a change to the
ribbon's rhythm changes the map's size too. Never give one a height the other
does not get, and never pad a card to make heights agree.

## Shapes

Flat rectangles with small radii, on a six-step scale (`--radius-*`):

| Step | Token | Size | Use |
| --- | --- | --- | --- |
| xs | `--radius-xs` | `3px` | Holiday spans, legend and detail swatches, the ribbon's focus ring. |
| sm | `--radius-sm` | `6px` | The ribbon row's hover band, small icon buttons. |
| md | `--radius-md` | `8px` | List rows (`.states__btn`). |
| lg | `--radius-lg` | `10px` | Inset panels (the selected-state card). |
| xl | `--radius-xl` | `14px` | Cards (ribbon, map, panel, error overlay). |
| pill | `--radius-pill` | `999px` | Year control, "heute" flag, cursor chip, scrollbar thumb. |

Borders are always a single hairline in `rule`, never one-sided. Holiday spans
are pure colour blocks with no outline; on the map, states are separated by a
`1.4`-wide stroke in `surface` so the fills read as one lit field.

## Components

### The Year Ribbon (signature)

- **Shape:** sixteen 30px rows, each a grid of a sticky 176px label column and a
  fixed-width day track; the whole thing scrolls horizontally at 20px per day.
- **Span:** absolutely positioned by day index (`left: day × 20px`), `62%` of
  the row tall (min `16px`), filled with the period's ramp token, `3px` radius,
  no border.
- **Span label:** the period name, drawn inside the span in that period's paired
  ink — **sticky**, pinned just right of the label column. So a long break names
  itself wherever you have scrolled to, and a column of pinned labels reads as a
  state → holiday table. Rendered only when the span is at least 116px wide, so
  a one-day `variabler Ferientag` stays a clean block.
- **Month name:** sticky inside its own month box, with a `surface` background
  so it occludes rather than collides with its neighbour.
- **Axis:** three rows — month names with their year, day numbers (tabular,
  weekends darker and semibold), and the hover date chip. A hairline gridline
  marks each month start, and a heavier `yearline` marks each 1 January.
- **Weekend bands:** a 4% ink tint behind the rows on every Saturday and Sunday,
  merged into one 2-day band per weekend.
- **Pointer:** a 1px `ink` vertical line at the hovered day plus a dark pill chip
  reading `Do 16.07.`; a dashed `ink-faint` line marks the real today.
- **Scrolling:** opens centred on the shown date; a plain vertical wheel pans the
  ribbon while it can move that way, otherwise the page scrolls; arrow keys step
  a day and keep the cursor in view.
- **States:** row hover/selection is a `color-mix` ink tint on the row band *and
  its sticky label*; selection dims the other rows to `0.42` opacity.
- **Motion:** on load and on year change, the spans settle in with a small rise
  and fade, staggered 18ms per row. The keyframe starts at `opacity: 0.4`, never
  0 — a frozen or late animation must never read as missing data.

**The Never-Hide Rule.** Entrance motion may move, tint and settle, but it never
starts from invisible. Anything a delayed keyframe could hide would, one slow
paint later, be "fixed" as a regression.

### The Map

- **Card:** the map card holds only the map — no heading, no caption, no date.
  It is `height: var(--tl-h)` with `16px` padding (12px below 900px, where it
  goes back to auto height with a `40vh` cap), so the drawing gets all of the
  shared height and still keeps a visible margin on every side.
- **Shape:** inline SVG of the 16 Bundesländer (Albers equal-area, north up).
- **Sizing — the part that must not be clever:** the element is *not* given
  `height: 100%`. Its own aspect is read from the viewBox and set as an inline
  `--map-ratio`, and then
  `width: min(100%, calc(var(--map-h) * var(--map-ratio))); height: auto;
  aspect-ratio: var(--map-ratio); max-height: 100%; overflow: hidden;`
  So the box is derived from its width, the width is bounded by the height the
  card can offer, and the clip is explicit. A percentage height on an SVG inside
  a grid item is resolved inconsistently across engines and can let the drawing
  spill out of the card; this cannot.
- **Fill:** `map-empty` at rest; the active period's ramp token when a state is
  on holiday on the shown date; `map-empty-hover` plus a `2.6` `ink` stroke on
  hover; a `3.2` `ink` stroke when selected. Fill transitions in `0.18s`.
- **Interaction:** hover (pointer or keyboard focus) highlights; click or
  Enter/Space selects; each state carries a `<title>` naming it and its status.

### The Day Panel

- **Head:** the shared date as a `--text-title` line (`Donnerstag, 16. Juli
  2026`) with the "heute" flag beside it, and the count as a `--text-label`
  line beneath it in `ink-muted`. It is the map's caption: figure above, caption
  below.
- **Top row:** date block and legend share one wrapping flex row,
  `justify-content: space-between`. The legend drops to its own line the moment
  there is no room for both — it never squeezes the date into a second line.
- **Body:** the day's list, then the selected state's year, then the legend.

### Year Control

- **What it does:** it does not load a year — it scrolls the one continuous axis
  to January of a year. Each chevron jumps exactly one year, and disables at the
  range ends, so there is never a run of years to get lost in and no wrapping.
- **What it reads:** the year the window is *showing*, taken from `viewIndex`
  (the mid-track day, published on scroll), not from the hovered day. A jump
  sets `viewIndex` immediately so the label answers the click at once instead of
  waiting for the scroll animation.

### Buttons & Controls

- **Year control:** a pill track (`surface`, `rule` border) holding two 30px
  round chevron buttons and a tabular year; a "Heute" pill sits beside it and
  goes faint when the current year is already shown. Each chevron disables at
  its bound.
- **List row:** a full-width ghost button, `6px 9px` padding, `8px` radius;
  hover and selection are ink tints, never colour.

### Chips

- **Heute flag:** `surface-sunken` pill with micro uppercase `ink-muted` text.
- **Cursor chip:** `ink` pill with `paper` text, tabular, centred on the cursor.
- **Legend swatch:** a `10px` square at `3px` radius in the period's token, with
  a micro label.

### Cards

- **Corner:** `14px`. **Background:** `surface`. **Border:** 1px `rule`.
  **Shadow:** the card shadow. **Padding:** `12–22px`.

## Do's and Don'ts

### Do:

- **Do** keep every hue semantic: a colour is a holiday period, or `focus`.
- **Do** use `oklch()` and the tokens in `src/styles/tokens.css`; never hard-code
  a hex in a component.
- **Do** keep the ribbon and the map on the same date — one store, one
  `activeIndex`, no local date state.
- **Do** keep `DAY_WIDTH` as the single source of the day scale; it drives the
  inline `--track-w`/`--day-w` and every span position.
- **Do** use a period's paired `*-ink` token for text on that period's fill.
- **Do** ship tabular figures for anything that lines up.
- **Do** respect `prefers-reduced-motion`; the ribbon must be fully readable
  without the entrance settle.

### Don't:

- **Don't** shrink the day width to fit a year on screen — the ribbon scrolls.
- **Don't** put white or grey text on a period fill; use the paired ink.
- **Don't** add a second shadow, a gradient, glass, or a glow.
- **Don't** introduce a second typeface, and never monospace as a costume.
- **Don't** put a border on one side of a box, or a zero-offset halo.
- **Don't** nest cards, and don't put controls inside the ribbon rows.
- **Don't** use an emoji or a Unicode glyph as an icon; the only icons are the
  two authored chevrons and the brand mark.
