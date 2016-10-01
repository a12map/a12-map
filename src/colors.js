import convert from 'color-convert';

export default function (number) {
  return `#${convert.hsv.hex(number, 100, 100)}`;
};
