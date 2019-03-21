export const ERROR = 'ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export function error(error) {
  return {
    type: ERROR,
    error
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}
