import { STATES, stateByCode, TYPES, typeLabel, typeColor } from '../lib/states.js';
import { holidayOn } from '../lib/holidays.js';
import { activeIndex, dateAt, isToday } from '../lib/view.js';
import { formatSpan, formatHeadline, formatWeekdayLong } from '../lib/dates.js';

const legend = TYPES.map(
  (type) => `<li class="legend__item"><i style="--c:${type.color}"></i>${type.label}</li>`,
).join('');

class FerienPanel extends HTMLElement {
  connectedCallback() {
    this.store = this.closest('ferien-app')?.store;
    if (!this.store) return;

    this.innerHTML = `
      <section class="panel">
        <div class="panel__top">
          <div class="panel__head">
            <p class="panel__date"><time></time> <span class="panel__flag" hidden>heute</span></p>
            <h2 class="panel__heading"></h2>
          </div>
          <ul class="legend">${legend}</ul>
        </div>
        <div class="panel__detail" hidden></div>
        <ul class="panel__states"></ul>
      </section>`;

    this._heading = this.querySelector('.panel__heading');
    this._date = this.querySelector('.panel__date time');
    this._flag = this.querySelector('.panel__flag');
    this._list = this.querySelector('.panel__states');
    this._detail = this.querySelector('.panel__detail');
    this._listKey = null;
    this._detailKey = null;

    this._list.addEventListener('pointerover', (event) => {
      const code = event.target.closest('[data-code]')?.dataset.code ?? null;
      if (code !== this.store.get().hover) this.store.set({ hover: code });
    });
    this._list.addEventListener('pointerleave', () => {
      if (this.store.get().hover) this.store.set({ hover: null });
    });
    this.addEventListener('click', (event) => this.onClick(event));

    this._unsubscribe = this.store.subscribe(() => this.refresh());
    this.refresh();
  }

  disconnectedCallback() {
    this._unsubscribe?.();
  }

  onClick(event) {
    if (event.target.closest('.panel__clear')) {
      this.store.set({ selected: null });
      return;
    }
    const code = event.target.closest('[data-code]')?.dataset.code;
    if (code) this.store.set((state) => ({ selected: state.selected === code ? null : code }));
  }

  refresh() {
    const state = this.store.get();
    const { data, status } = state;
    const index = activeIndex(state);
    this.renderHead(state, index);
    const key = `${data?.days ?? status}|${index}`;
    if (key !== this._listKey) {
      this._listKey = key;
      this.renderList(state, index);
    }
    this.renderHighlight(state);
    this.renderDetail(state);
  }

  /** The shared date lives with the list it explains, not inside the map card. */
  renderHead(state, index) {
    const active = dateAt(state, index);
    this._date.textContent =
      `${formatWeekdayLong(active)}, ${formatHeadline(active)} ${active.getUTCFullYear()}`;
    this._flag.hidden = !isToday(state);
  }

  renderList(state, index) {
    const { data, status } = state;
    if (status !== 'ready' || !data) {
      this._heading.textContent = status === 'error' ? 'Keine Daten' : 'Lade Ferien …';
      this._list.innerHTML = '';
      return;
    }

    const onHoliday = STATES.filter(({ code }) => holidayOn(data, code, index));
    this._heading.textContent = onHoliday.length
      ? `${onHoliday.length} ${onHoliday.length === 1 ? 'Bundesland hat' : 'Bundesländer haben'} Ferien`
      : 'Keine Ferien an diesem Tag';

    this._list.innerHTML = onHoliday
      .map(({ code, name }) => {
        const type = holidayOn(data, code, index);
        return `
          <li class="states__item" data-code="${code}">
            <button type="button" class="states__btn">
              <i class="states__dot" style="--c:${typeColor(type)}"></i>
              <span class="states__name">${name}</span>
              <span class="states__type">${typeLabel(type)}</span>
            </button>
          </li>`;
      })
      .join('');
  }

  renderHighlight(state) {
    for (const item of this._list.querySelectorAll('.states__item')) {
      const { code } = item.dataset;
      item.classList.toggle('is-hover', state.hover === code);
      item.classList.toggle('is-selected', state.selected === code);
    }
  }

  renderDetail(state) {
    const { data, selected } = state;
    const key = `${selected ?? ''}|${data?.days ?? ''}`;
    if (key === this._detailKey) return;
    this._detailKey = key;

    if (!selected || !data) {
      this._detail.hidden = true;
      this._detail.innerHTML = '';
      return;
    }
    const chosen = stateByCode[selected];
    const rows = data.spans[selected]
      .map(
        (span) => `
          <li class="detail__row">
            <i style="--c:${typeColor(span.type)}"></i>
            <span class="detail__type">${span.label}</span>
            <span class="detail__range">${formatSpan(dateAt(state, span.from), dateAt(state, span.to))}</span>
          </li>`,
      )
      .join('');
    this._detail.hidden = false;
    this._detail.innerHTML = `
      <header class="detail__head">
        <h3>${chosen.name}</h3>
        <button type="button" class="panel__clear" aria-label="Auswahl aufheben">×</button>
      </header>
      <ul class="detail__list">${rows}</ul>`;
  }
}

customElements.define('ferien-panel', FerienPanel);
