export const LOADED = 'LOADED';

export function load() {
  return {
    type: LOADED,
    loaded: true
  };
}