import { STATES } from '../lib/states.js';
import {
  MONTHS_LONG,
  absoluteDayOf,
  dateOfAbsoluteDay,
  isWeekend,
  formatShort,
  formatWeekday,
  formatWeekdayLong,
  formatHeadline,
} from '../lib/dates.js';
import { activeIndex, dateAt, todayIndex } from '../lib/view.js';

/** Pixels per calendar day. The axis is a scrollable window, not a poster. */
const DAY_WIDTH = 20;
/** A span narrower than this gets no inline label. */
const LABEL_MIN_WIDTH = 116;

class FerienTimeline extends HTMLElement {
  connectedCallback() {
    this.store = this.closest('ferien-app')?.store;
    if (!this.store) return;
    this._signature = '';
    this._centredKey = null;
    this._focusSeq = 0;
    this.render();
    this._unsubscribe = this.store.subscribe(() => this.update());

    this.addEventListener('pointermove', (event) => this.onPointerMove(event));
    this.addEventListener('pointerleave', () => this.clearPointer());
    this.addEventListener('keydown', (event) => this.onKeyDown(event));
    this.addEventListener('focusin', () => this.onFocus());
    this.addEventListener('click', (event) => this.onClick(event));
    this.addEventListener('wheel', (event) => this.onWheel(event), { passive: false });
    this.addEventListener('scroll', () => this.onScroll(), true);
  }

  disconnectedCallback() {
    this._unsubscribe?.();
  }

  get scroller() {
    return this.querySelector('.tl__scroll');
  }

  get track() {
    return this.querySelector('.tl__row .tl__track');
  }

  get labelWidth() {
    return this.querySelector('.tl__row .tl__label')?.offsetWidth ?? 176;
  }

  update() {
    const state = this.store.get();
    const signature = `${state.status}|${state.data?.days ?? 0}`;
    if (signature !== this._signature) {
      this._signature = signature;
      this.render();
      return;
    }
    this.refresh();
    if (state.focus.seq !== this._focusSeq) {
      this._focusSeq = state.focus.seq;
      if (state.focus.index != null) this.scrollToDay(state.focus.index, 'smooth');
    }
  }

  // ----- rendering -------------------------------------------------------

  monthBuckets(startAbs, days) {
    const buckets = [];
    for (let index = 0; index < days; ) {
      const date = dateOfAbsoluteDay(startAbs + index);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const to = Math.min(days - 1, absoluteDayOf(year, month + 2, 1) - 1 - startAbs);
      buckets.push({ year, month, from: index, to });
      index = to + 1;
    }
    return buckets;
  }

  render() {
    const state = this.store.get();
    const { status, data, error, range } = state;
    const days = data?.days ?? range.days;
    const { startAbs } = range;
    const ready = status === 'ready' && data;
    const trackWidth = days * DAY_WIDTH;

    const months = [];
    const gridlines = [];
    const yearlines = [];
    for (const { year, month, from, to } of this.monthBuckets(startAbs, days)) {
      months.push(
        `<span class="tl__month" style="left:${from * DAY_WIDTH}px;width:${(to - from + 1) * DAY_WIDTH}px">` +
          `<span class="tl__month-label">${MONTHS_LONG[month]} ` +
          `<span class="tl__month-year">${year}</span></span></span>`,
      );
      gridlines.push(`<span class="tl__gridline" style="left:${from * DAY_WIDTH}px"></span>`);
      if (month === 0) yearlines.push(`<span class="tl__yearline" style="left:${from * DAY_WIDTH}px"></span>`);
    }

    const dayNumbers = [];
    const weekendBands = [];
    for (let index = 0, weekendStart = null; index <= days; index += 1) {
      const weekend = index < days && isWeekend(dateOfAbsoluteDay(startAbs + index));
      if (index < days) {
        const day = dateOfAbsoluteDay(startAbs + index);
        dayNumbers.push(
          `<span class="tl__day${weekend ? ' is-weekend' : ''}" style="left:${index * DAY_WIDTH}px">` +
            `${day.getUTCDate()}</span>`,
        );
      }
      if (weekend && weekendStart === null) weekendStart = index;
      if (!weekend && weekendStart !== null) {
        weekendBands.push(
          `<span class="tl__weekend" style="left:${weekendStart * DAY_WIDTH}px;` +
            `width:${(index - weekendStart) * DAY_WIDTH}px"></span>`,
        );
        weekendStart = null;
      }
    }

    const rows = STATES.map((state_, index) => {
      const spans = ready
        ? data.spans[state_.code]
            .map((span) => {
              const width = (span.to - span.from + 1) * DAY_WIDTH;
              const label =
                width >= LABEL_MIN_WIDTH ? `<span class="tl__span-label">${span.label}</span>` : '';
              return (
                `<span class="tl__span" data-type="${span.type}" title="${span.label}" ` +
                `style="left:${span.from * DAY_WIDTH}px;width:${width}px">${label}</span>`
              );
            })
            .join('')
        : '';
      return `
        <div class="tl__row" data-code="${state_.code}" style="--i:${index}">
          <div class="tl__label">
            <span class="tl__name">${state_.name}</span>
            <span class="tl__code">${state_.code}</span>
          </div>
          <div class="tl__track">${spans}</div>
        </div>`;
    }).join('');

    this.innerHTML = `
      <div class="tl" data-status="${status}">
        <div class="tl__scroll">
          <div class="tl__inner" style="--days:${days};--track-w:${trackWidth}px;--day-w:${DAY_WIDTH}px">
            <div class="tl__axis">
              <div class="tl__label tl__label--axis"><span class="tl__axis-caption">Bundesland</span></div>
              <div class="tl__track tl__track--axis">
                <div class="tl__months">${months.join('')}</div>
                <div class="tl__daynums">${dayNumbers.join('')}</div>
                <div class="tl__chipline"><span class="tl__chip" hidden></span></div>
              </div>
            </div>
            <div class="tl__plot" tabindex="0" role="slider"
                 aria-label="Feriendaten der Bundesländer" aria-valuemin="0" aria-valuemax="${days - 1}"
                 aria-valuenow="0" aria-valuetext="">
              <div class="tl__overlay">
                ${weekendBands.join('')}
                ${gridlines.join('')}
                ${yearlines.join('')}
                <div class="tl__today"></div>
                <div class="tl__cursor" hidden></div>
              </div>
              ${rows}
            </div>
          </div>
        </div>
        ${
          status === 'error'
            ? `<div class="tl__error" role="alert">
                 <p>Die Feriendaten konnten nicht geladen werden.</p>
                 <p class="tl__error-detail">${error ?? ''}</p>
                 <button type="button" class="btn" data-retry>Erneut versuchen</button>
               </div>`
            : ''
        }
      </div>`;

    requestAnimationFrame(() => this.querySelector('.tl')?.classList.add('is-enter'));
    this.refresh();

    if (ready && this._centredKey !== startAbs) {
      this._centredKey = startAbs;
      this.centerOnActive();
    }
  }

  // ----- state-driven updates -------------------------------------------

  refresh() {
    const state = this.store.get();
    const plot = this.querySelector('.tl__plot');
    if (!plot) return;
    const { pointer, hover, selected } = state;

    const cursor = this.querySelector('.tl__cursor');
    const chip = this.querySelector('.tl__chip');
    const today = this.querySelector('.tl__today');

    if (pointer != null) {
      const date = dateAt(state, pointer);
      const x = (pointer + 0.5) * DAY_WIDTH;
      cursor.hidden = false;
      cursor.style.setProperty('--x', `${x}px`);
      chip.hidden = false;
      chip.textContent = `${formatWeekday(date)} ${formatShort(date)}`;
      chip.style.setProperty('--cx', `${x}px`);
    } else {
      cursor.hidden = true;
      chip.hidden = true;
    }

    today.style.setProperty('--x', `${(todayIndex(state) + 0.5) * DAY_WIDTH}px`);

    const index = activeIndex(state);
    const active = dateAt(state, index);
    plot.setAttribute('aria-valuenow', String(index));
    plot.setAttribute(
      'aria-valuetext',
      `${formatWeekdayLong(active)}, ${formatHeadline(active)} ${active.getUTCFullYear()}`,
    );

    for (const row of this.querySelectorAll('.tl__row')) {
      const { code } = row.dataset;
      row.classList.toggle('is-hover', hover === code);
      row.classList.toggle('is-selected', selected === code);
      row.classList.toggle('is-dim', Boolean(selected) && selected !== code);
    }
  }

  /** Put the shown day in the middle of the viewport (load, and year jumps). */
  centerOnActive() {
    if (this.scroller) this.scrollToDay(activeIndex(this.store.get()));
  }

  scrollToDay(index, behavior = 'auto') {
    const scroller = this.scroller;
    if (!scroller) return;
    const target = this.labelWidth / 2 + (index + 0.5) * DAY_WIDTH - scroller.clientWidth / 2;
    const max = scroller.scrollWidth - scroller.clientWidth;
    scroller.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior });
  }

  /*
   * What the window is actually showing, mid-track. The year control reads this
   * rather than the hovered day, so jumping a year always moves the window
   * forward — and the label follows a manual scroll too.
   */
  onScroll() {
    const scroller = this.scroller;
    if (!scroller) return;
    const label = this.labelWidth;
    const days = this.store.get().data?.days ?? this.store.get().range.days;
    const centre = (scroller.scrollLeft + (scroller.clientWidth - label) / 2) / DAY_WIDTH;
    const index = Math.max(0, Math.min(days - 1, Math.round(centre)));
    if (index !== this.store.get().viewIndex) this.store.set({ viewIndex: index });
  }

  /** After a keyboard step, keep the cursor just inside the window. */
  revealDay(index) {
    const scroller = this.scroller;
    if (!scroller) return;
    const label = this.labelWidth;
    const x = (index + 0.5) * DAY_WIDTH;
    const margin = 90;
    const left = scroller.scrollLeft - label;
    if (x < left + margin) this.scrollToDay(index, 'smooth');
    else if (x > left + scroller.clientWidth - label - margin) this.scrollToDay(index, 'smooth');
  }

  // ----- interaction -----------------------------------------------------

  dayFromEvent(event) {
    const track = this.track;
    if (!track) return null;
    const rect = track.getBoundingClientRect();
    if (!rect.width) return null; // not laid out (hidden, mid-mount)
    const days = this.store.get().data?.days ?? this.store.get().range.days;
    const index = Math.floor((event.clientX - rect.left) / DAY_WIDTH);
    return index < 0 || index >= days ? null : index;
  }

  onPointerMove(event) {
    const index = this.dayFromEvent(event);
    const code = event.target.closest('.tl__row')?.dataset.code ?? null;
    const state = this.store.get();
    if (index == null) {
      if (code !== state.hover) this.store.set({ hover: code });
      return;
    }
    if (index !== state.pointer || code !== state.hover) this.store.set({ pointer: index, hover: code });
  }

  clearPointer() {
    if (this.store.get().pointer != null) this.store.set({ pointer: null, hover: null });
  }

  onFocus() {
    if (this.store.get().pointer == null) this.store.set({ pointer: activeIndex(this.store.get()) });
  }

  onKeyDown(event) {
    const state = this.store.get();
    const days = state.data?.days ?? state.range.days;
    const current = state.pointer ?? activeIndex(state);
    const step = { ArrowLeft: -1, ArrowRight: 1, PageUp: -7, PageDown: 7 }[event.key];
    let next = null;
    if (step != null) next = Math.min(days - 1, Math.max(0, current + step));
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = days - 1;
    else return;
    event.preventDefault();
    this.store.set({ pointer: next });
    this.revealDay(next);
  }

  /** A plain vertical wheel over the ribbon pans it — the page rarely scrolls. */
  onWheel(event) {
    const scroller = this.scroller;
    if (!scroller) return;
    if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return; // trackpad already pans
    const max = scroller.scrollWidth - scroller.clientWidth;
    if (max <= 0) return;
    const next = Math.max(0, Math.min(max, scroller.scrollLeft + event.deltaY));
    if (next === scroller.scrollLeft) return;
    event.preventDefault();
    scroller.scrollLeft = next;
  }

  onClick(event) {
    if (event.target.closest('[data-retry]')) {
      this.dispatchEvent(new CustomEvent('ferien-retry', { bubbles: true }));
      return;
    }
    const code = event.target.closest('.tl__row')?.dataset.code;
    if (code) this.store.set((state) => ({ selected: state.selected === code ? null : code }));
  }
}

customElements.define('ferien-timeline', FerienTimeline);
