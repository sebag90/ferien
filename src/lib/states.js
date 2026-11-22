// The 16 Bundesländer, alphabetical by German name, with the code the API uses.
export const STATES = [
  { code: 'BW', name: 'Baden-Württemberg' },
  { code: 'BY', name: 'Bayern' },
  { code: 'BE', name: 'Berlin' },
  { code: 'BB', name: 'Brandenburg' },
  { code: 'HB', name: 'Bremen' },
  { code: 'HH', name: 'Hamburg' },
  { code: 'HE', name: 'Hessen' },
  { code: 'MV', name: 'Mecklenburg-Vorpommern' },
  { code: 'NI', name: 'Niedersachsen' },
  { code: 'NW', name: 'Nordrhein-Westfalen' },
  { code: 'RP', name: 'Rheinland-Pfalz' },
  { code: 'SL', name: 'Saarland' },
  { code: 'SN', name: 'Sachsen' },
  { code: 'ST', name: 'Sachsen-Anhalt' },
  { code: 'SH', name: 'Schleswig-Holstein' },
  { code: 'TH', name: 'Thüringen' },
];

export const stateByCode = Object.fromEntries(STATES.map((s) => [s.code, s]));

// Holiday types in calendar order, each with its own step of the seasonal ramp.
export const TYPES = [
  { id: 'winterferien', label: 'Winterferien', color: 'var(--c-winter)' },
  { id: 'osterferien', label: 'Osterferien', color: 'var(--c-oster)' },
  { id: 'pfingstferien', label: 'Pfingstferien', color: 'var(--c-pfingsten)' },
  { id: 'sommerferien', label: 'Sommerferien', color: 'var(--c-sommer)' },
  { id: 'herbstferien', label: 'Herbstferien', color: 'var(--c-herbst)' },
  { id: 'weihnachtsferien', label: 'Weihnachtsferien', color: 'var(--c-weihnachten)' },
  { id: 'variabler_ferientag', label: 'Variabler Ferientag', color: 'var(--c-variabel)' },
];

export const typeById = Object.fromEntries(TYPES.map((t) => [t.id, t]));

export const typeLabel = (id) => typeById[id]?.label ?? id;
export const typeColor = (id) => typeById[id]?.color ?? 'var(--c-variabel)';
