import { absoluteDayOf } from '../lib/dates.js';
import { dateAt, todayIndex } from '../lib/view.js';

const CHEVRON = {
  prev: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

/**
 * The axis runs continuously from the first to the last year, so this control
 * does not load a year: it scrolls the ribbon to one. It reports the year of
 * the day currently shown, and each chevron jumps to January of the year either
 * side — no further, so there is never a run of years to get lost in.
 */
class FerienYearSwitcher extends HTMLElement {
  connectedCallback() {
    this.store = this.closest('ferien-app')?.store;
    if (!this.store) return;

    this.innerHTML = `
      <div class="years" role="group" aria-label="Zum Jahr springen">
        <button class="years__step" data-step="-1" type="button" aria-label="Zum vorherigen Jahr">${CHEVRON.prev}</button>
        <span class="years__value" aria-live="polite"></span>
        <button class="years__step" data-step="1" type="button" aria-label="Zum nächsten Jahr">${CHEVRON.next}</button>
        <button class="years__today" type="button">Heute</button>
      </div>`;

    this._value = this.querySelector('.years__value');
    this._prev = this.querySelector('[data-step="-1"]');
    this._next = this.querySelector('[data-step="1"]');

    this.addEventListener('click', (event) => this.onClick(event));
    this._unsubscribe = this.store.subscribe(() => this.render());
    this.render();
  }

  disconnectedCallback() {
    this._unsubscribe?.();
  }

  /** The year the window is showing — what jumping a year is relative to. */
  shownYear() {
    const state = this.store.get();
    const index = state.viewIndex ?? todayIndex(state);
    return dateAt(state, index).getUTCFullYear();
  }

  jumpTo(index) {
    const { range, focus } = this.store.get();
    const target = Math.max(0, Math.min(range.days - 1, index));
    this.store.set({
      focus: { index: target, seq: focus.seq + 1 },
      // The window is on its way there, so the label can say so straight away
      // rather than waiting for an animation to finish.
      viewIndex: target,
      pointer: null,
      hover: null,
    });
  }

  onClick(event) {
    const step = event.target.closest('[data-step]');
    if (step) {
      const { range } = this.store.get();
      const target = this.shownYear() + Number(step.dataset.step);
      if (target < range.fromYear || target > range.toYear) return;
      this.jumpTo(absoluteDayOf(target, 1, 1) - range.startAbs);
      return;
    }
    if (event.target.closest('.years__today')) this.jumpTo(todayIndex(this.store.get()));
  }

  render() {
    const { range } = this.store.get();
    const year = this.shownYear();
    this._value.textContent = year;
    this._prev.disabled = year <= range.fromYear;
    this._next.disabled = year >= range.toYear;
  }
}

customElements.define('ferien-year-switcher', FerienYearSwitcher);
