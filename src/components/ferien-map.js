import { VIEW_BOX, STATE_PATHS } from '../data/germany-paths.js';
import { STATES, stateByCode, typeLabel, typeColor } from '../lib/states.js';
import { holidayOn } from '../lib/holidays.js';
import { activeIndex } from '../lib/view.js';

/* The map's own aspect, read from its viewBox, so the card can size the box
   without ever relying on a percentage height (which engines resolve
   inconsistently and which lets the drawing spill out of its card). */
const [, , VB_WIDTH, VB_HEIGHT] = VIEW_BOX.split(' ').map(Number);
const MAP_RATIO = VB_WIDTH / VB_HEIGHT;

const paths = STATES.map(
  ({ code, name }) =>
    `<path class="map__state" data-code="${code}" tabindex="0" role="button" aria-pressed="false" ` +
    `d="${STATE_PATHS[code]}"><title>${name}</title></path>`,
).join('');

class FerienMap extends HTMLElement {
  connectedCallback() {
    this.store = this.closest('ferien-app')?.store;
    if (!this.store) return;

    this.innerHTML = `
      <section class="map">
        <svg class="map__svg" viewBox="${VIEW_BOX}" style="--map-ratio:${MAP_RATIO.toFixed(4)}"
             role="group" aria-label="Karte der Bundesländer">
          ${paths}
        </svg>
      </section>`;

    this.addEventListener('pointerover', (event) => this.onOver(event));
    this.addEventListener('pointerleave', () => this.store.set({ hover: null }));
    this.addEventListener('click', (event) => this.onActivate(event));
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onActivate(event);
      }
    });

    this._unsubscribe = this.store.subscribe(() => this.refresh());
    this.refresh();
  }

  disconnectedCallback() {
    this._unsubscribe?.();
  }

  onOver(event) {
    const code = event.target.closest('.map__state')?.dataset.code ?? null;
    if (code !== this.store.get().hover) this.store.set({ hover: code });
  }

  onActivate(event) {
    const code = event.target.closest('.map__state')?.dataset.code;
    if (code) this.store.set((state) => ({ selected: state.selected === code ? null : code }));
  }

  refresh() {
    const state = this.store.get();
    const { data, hover, selected, status } = state;
    const index = activeIndex(state);

    this.querySelector('.map').dataset.status = status;

    for (const path of this.querySelectorAll('.map__state')) {
      const { code } = path.dataset;
      const type = holidayOn(data, code, index);
      path.classList.toggle('is-active', Boolean(type));
      path.classList.toggle('is-hover', hover === code);
      path.classList.toggle('is-selected', selected === code);
      path.setAttribute('aria-pressed', String(selected === code));
      if (type) path.style.setProperty('--c', typeColor(type));
      path.querySelector('title').textContent = type
        ? `${stateByCode[code].name} · ${typeLabel(type)}`
        : `${stateByCode[code].name} · keine Ferien`;
    }
  }
}

customElements.define('ferien-map', FerienMap);
