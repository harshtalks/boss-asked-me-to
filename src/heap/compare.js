/**
 * @description
 * default compare for the min heap
 * @param {number!} a
 * @param {number!} b
 */
export default function Compare(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else return 0;
}
