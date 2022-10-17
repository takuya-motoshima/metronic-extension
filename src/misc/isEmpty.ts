import trim from '~/misc/trim';

/**
 * Check if the string is empty.
 */
export default (payload: string): boolean => {
  return trim(payload) === '';
}