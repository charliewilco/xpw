import chroma from "chroma-js";

const assertString = (input: any) => {
  const isString = typeof input === "string" || input instanceof String;

  if (!isString) {
    throw new TypeError("This can only validate strings only");
  }

  return isString;
};

const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

export const isHexColor = (str: string): boolean => {
  assertString(str);
  return hexcolor.test(str);
};

export const getTextColorFromCurrent = (color: any): string => {
  let vsWhite = isHexColor(color) ? chroma.contrast(color, "white") : "#666";
  if (vsWhite > 4) {
    return "#FFF";
  } else {
    return chroma(color).darken(3).hex();
  }
};
