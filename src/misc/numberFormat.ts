import isString from '~/misc/isString';

/**
 * To a number with a comma.
 */
export default (num: string|number): string => {
  if (num == null)
    num = 0;
  else if (isString(num))
    num = parseFloat(num as string);
  return num.toLocaleString();
}