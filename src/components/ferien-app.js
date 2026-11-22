import { createStore } from '../lib/store.js';
import { fetchHolidays, API_MIN_YEAR, API_MAX_YEAR } from '../lib/api.js';
import { indexRange } from '../lib/holidays.js';
import { absoluteDayOf } from '../lib/dates.js';
import './ferien-year-switcher.js';
import './ferien-timeline.js';
import './ferien-map.js';
import './ferien-panel.js';

const now = new Date();
const today = { abs: absoluteDayOf(now.getFullYear(), now.getMonth() + 1, now.getDate()) };

/* One unbroken range, one year either side of today: December and the January
   after it share an axis, so the year boundary is a position, not a seam. */
const fromYear = Math.max(API_MIN_YEAR, now.getFullYear() - 1);
const toYear = Math.min(API_MAX_YEAR, now.getFullYear() + 1);
const startAbs = absoluteDayOf(fromYear, 1, 1);
const range = {
  fromYear,
  toYear,
  startAbs,
  days: absoluteDayOf(toYear + 1, 1, 1) - startAbs,
};

const BRAND_MARK = `
  <svg class="brand__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="2" y="3" width="13" height="4" rx="1.4" fill="var(--c-winter)"/>
    <rect x="6" y="10" width="16" height="4" rx="1.4" fill="var(--c-sommer)"/>
    <rect x="2" y="17" width="9" height="4" rx="1.4" fill="var(--c-herbst)"/>
  </svg>`;

class FerienApp extends HTMLElement {
  connectedCallback() {
    this.store = createStore({
      range,
      today,
      status: 'loading',
      error: null,
      data: null,
      pointer: null,
      hover: null,
      selected: null,
      focus: { index: null, seq: 0 },
      viewIndex: null,
    });

    this.innerHTML = `
      <header class="site-header">
        <a class="brand" href="./">
          ${BRAND_MARK}
          <span class="brand__text">Schulferien <span class="brand__muted">in Deutschland</span></span>
        </a>
        <ferien-year-switcher></ferien-year-switcher>
      </header>
      <main class="layout">
        <section class="cell cell--timeline" aria-label="Jahresübersicht">
          <ferien-timeline></ferien-timeline>
        </section>
        <aside class="cell cell--side" aria-label="Karte">
          <ferien-map></ferien-map>
        </aside>
        <section class="cell cell--panel" aria-label="Ferien an diesem Tag">
          <ferien-panel></ferien-panel>
        </section>
      </main>
      <footer class="site-footer">
        <p>
          Feriendaten: <a href="https://schulferien-api.de" rel="noopener">schulferien-api.de</a>
          · Karte: GeoBasis-DE, gemeinfrei via
          <a href="https://github.com/isellsoap/deutschlandGeoJSON" rel="noopener">deutschlandGeoJSON</a>
        </p>
      </footer>`;

    this.addEventListener('ferien-retry', () => this.load());
    this.load();
  }

  async load() {
    this.store.set({ status: 'loading', error: null });
    try {
      const years = [];
      for (let year = range.fromYear; year <= range.toYear; year += 1) years.push(year);
      const entries = await Promise.all(years.map(fetchHolidays));
      this.store.set({ data: indexRange(entries, range.fromYear, range.toYear), status: 'ready' });
    } catch (error) {
      this.store.set({ status: 'error', error: error.message });
    }
  }
}

customElements.define('ferien-app', FerienApp);
