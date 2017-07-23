function assertString(input) {
  const isString = (typeof input === 'string' || input instanceof String);

  if (!isString) {
    throw new TypeError('This can only validate strings only');
  }
}

const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

export default function isHexColor(str) {
  assertString(str);
  return hexcolor.test(str);
}
