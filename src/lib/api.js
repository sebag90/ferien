const BASE = 'https://schulferien-api.de/api/v1';

/** What the API can serve at all. The app offers one year either side of today. */
export const API_MIN_YEAR = 2022;
export const API_MAX_YEAR = 2029;

const cache = new Map();

/**
 * All holidays of one year for all 16 states, in a single request.
 * Cached per year for the lifetime of the page.
 */
export function fetchHolidays(year) {
  if (!cache.has(year)) {
    const request = fetch(`${BASE}/${year}`).then((response) => {
      if (!response.ok) throw new Error(`Die Ferien-API antwortete mit ${response.status}.`);
      return response.json();
    });
    request.catch(() => cache.delete(year));
    cache.set(year, request);
  }
  return cache.get(year);
}
