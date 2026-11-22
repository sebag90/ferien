import { STATES, typeLabel } from './states.js';
import { absoluteDayOf, parseISODate } from './dates.js';

/**
 * Fold one API payload per year into a single continuous run of days, from
 * 1 January of `fromYear` to 31 December of `toYear`. Per state:
 *
 *   spans  — the period rectangles to draw, in axis indices
 *   typeAt — an axis index → holiday-type lookup for O(1) date queries
 *
 * Because the axis is absolute, a Weihnachtsferien that starts in December and
 * ends in January is one span crossing the year boundary, exactly as it is in
 * life.
 */
export function indexRange(entriesByYear, fromYear, toYear) {
  const startAbs = absoluteDayOf(fromYear, 1, 1);
  const endAbs = absoluteDayOf(toYear + 1, 1, 1) - 1;
  const days = endAbs - startAbs + 1;

  const spans = {};
  const typeAt = {};
  for (const { code } of STATES) {
    spans[code] = [];
    typeAt[code] = new Array(days).fill(null);
  }

  const seen = new Set();
  for (const entries of entriesByYear) {
    for (const entry of entries) {
      const bucket = spans[entry.stateCode];
      if (!bucket || seen.has(entry.id)) continue;
      seen.add(entry.id);

      const start = parseISODate(entry.start);
      const end = parseISODate(entry.end);
      const from = Math.max(0, absoluteDayOf(start.year, start.month, start.day) - startAbs);
      const to = Math.min(days - 1, absoluteDayOf(end.year, end.month, end.day) - startAbs);
      if (to < from) continue;

      bucket.push({ from, to, type: entry.name, label: entry.name_cp || typeLabel(entry.name) });
      const lookup = typeAt[entry.stateCode];
      for (let day = from; day <= to; day += 1) if (!lookup[day]) lookup[day] = entry.name;
    }
  }

  for (const { code } of STATES) spans[code].sort((a, b) => a.from - b.from);

  return { fromYear, toYear, startAbs, days, spans, typeAt };
}

/** The holiday type covering an axis index, or null. */
export const holidayOn = (data, code, index) =>
  index == null ? null : data?.typeAt[code]?.[index] ?? null;

/** The span covering an axis index (used for the detail list), or null. */
export const spanOn = (data, code, index) =>
  index == null ? null : data?.spans[code]?.find((span) => index >= span.from && index <= span.to) ?? null;

/** Every state on holiday at an axis index. */
export function statesOnHoliday(data, index) {
  return STATES.filter(({ code }) => holidayOn(data, code, index) !== null).map(({ code }) => code);
}
