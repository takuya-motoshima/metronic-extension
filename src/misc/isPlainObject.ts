import getType from '~/misc/getType';

/**
 * Check for plain objects.
 */
export default (payload: any): boolean => {
  if (getType(payload) !== 'Object')
    return false;
  return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
}