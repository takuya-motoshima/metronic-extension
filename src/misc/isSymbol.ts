import getType from '~/misc/getType';

/**
 * Check for Symbol.
 */
export default (payload: any): boolean => {
  return getType(payload) === 'Symbol';
}