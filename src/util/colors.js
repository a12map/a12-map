import convert from 'color-convert';

const K = 10;

export default function (number) {

  let reverse = 240 - (number*K);
  if (reverse < 1) {
    reverse = 1;
  }
  return `#${convert.hsv.hex(reverse, 100, 100)}`;
};
