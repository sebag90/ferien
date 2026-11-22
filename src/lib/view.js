import { dateOfAbsoluteDay } from './dates.js';

/** Today's position on the axis. */
export const todayIndex = (state) => state.today.abs - state.range.startAbs;

/** The day index under the cursor, else today. */
export function activeIndex(state) {
  if (state.pointer != null) return state.pointer;
  const last = (state.data?.days ?? state.range.days) - 1;
  return Math.max(0, Math.min(last, todayIndex(state)));
}

/** The date a given axis index stands for. */
export const dateAt = (state, index) => dateOfAbsoluteDay(state.range.startAbs + index);

export const isToday = (state) => state.pointer == null && activeIndex(state) === todayIndex(state);
