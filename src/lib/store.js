/**
 * Tiny synchronous observable. `subscribe` returns an unsubscribe function.
 * Every setter notifies listeners with (state, previousState).
 */
export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set(patch) {
      const previous = state;
      state = { ...state, ...(typeof patch === 'function' ? patch(previous) : patch) };
      for (const listener of listeners) listener(state, previous);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
