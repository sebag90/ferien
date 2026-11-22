export const MS_DAY = 86_400_000;

export const MONTHS_LONG = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

/*
 * The ribbon's axis is one unbroken run of days, so every date is reduced to an
 * absolute day number (days since 1970-01-01, UTC). Year boundaries are then
 * just another position on the axis, never a seam.
 */
export const absoluteDayOf = (year, month, day) =>
  Math.round(Date.UTC(year, month - 1, day) / MS_DAY);

export const absoluteDay = (date) => Math.round(date.getTime() / MS_DAY);

export const dateOfAbsoluteDay = (absolute) => new Date(absolute * MS_DAY);

export const parseISODate = (iso) => {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return { year, month, day };
};

/** 0 = Sunday … 6 = Saturday, in UTC. */
export const isWeekend = (date) => [0, 6].includes(date.getUTCDay());

const withUTC = (options) => new Intl.DateTimeFormat('de-DE', { timeZone: 'UTC', ...options });

const fmtHeadline = withUTC({ day: 'numeric', month: 'long' });
const fmtWeekday = withUTC({ weekday: 'short' });
const fmtWeekdayLong = withUTC({ weekday: 'long' });
const fmtShort = withUTC({ day: '2-digit', month: '2-digit' });
const fmtRange = withUTC({ day: 'numeric', month: 'short' });

export const formatHeadline = (date) => fmtHeadline.format(date); // 22. November
export const formatWeekday = (date) => fmtWeekday.format(date); // Sa
export const formatWeekdayLong = (date) => fmtWeekdayLong.format(date); // Samstag
export const formatShort = (date) => fmtShort.format(date); // 22.11.
export const formatRange = (date) => fmtRange.format(date); // 22. Nov.

/** "22. – 26. Nov." style span for the selected state's detail list. */
export const formatSpan = (from, to) => {
  const a = formatRange(from);
  const b = formatRange(to);
  return a === b ? a : `${a} – ${b}`;
};
