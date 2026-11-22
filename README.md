# Schulferien in Deutschland

The German school holidays as one scrolling, day-level timeline of the 16
Bundesländer, wired to a map — hover a day and both views follow.

Static files: no build step, no dependencies. The browser calls
[schulferien-api.de](https://schulferien-api.de) directly (it sends
`Access-Control-Allow-Origin: *`), so there is no backend to run either.

## Run it

```sh
just up     # build the image and serve it at http://localhost:8080
just down   # stop
just dev    # foreground with the directory bind-mounted: edit, then reload
```

`just up` bakes the files into the image, so use `just dev` while editing —
otherwise you are looking at the build from the last `just up`.

## How it is put together

| Path | What |
| --- | --- |
| `index.html` | thin shell: one `<ferien-app>` |
| `src/components/` | `ferien-app` owns the state; `ferien-timeline`, `ferien-map`, `ferien-panel`, `ferien-year-switcher` are native custom elements |
| `src/lib/` | logic only — `api`, `dates`, `holidays`, `states`, `store`, `view` |
| `src/data/germany-paths.js` | generated: the 16 state outlines |
| `src/styles/` | split CSS; `tokens.css` holds every colour, size and radius |
| `scripts/build-map.py` | regenerates the outlines |

`PRODUCT.md` records what the product is; `DESIGN.md` the visual system.

## Behaviour worth knowing

- The timeline is **one continuous axis** at a fixed 20px per day, spanning the
  current year and one year either side (clamped to the API's 2022–2029), so
  December and the following January share a screen and a holiday crossing the
  year boundary is a single bar.
- **No date picking**: the shown date comes from hovering the timeline. Leaving
  it falls back to today.
- The year control scrolls that axis to January — it does not load a year.

## Regenerate the map

Only needed when the outline data changes:

```sh
just map
```

Boundaries come from [isellsoap/deutschlandGeoJSON](https://github.com/isellsoap/deutschlandGeoJSON)
(Unlicense / public domain, originally GeoBasis-DE), reprojected with an Albers
equal-area conic and simplified into one SVG path per state.

## Release

`.github/workflows/release.yml` publishes the container to `ghcr.io` when run
manually from the Actions tab (optionally with a version), or when a GitHub
Release is published:

```sh
podman pull ghcr.io/<owner>/ferien:latest
```
