/**
 *
 * @param {*} value
 */
export default function validateElement(value) {
  return (
    value.priority !== undefined &&
    value.task !== undefined &&
    value !== null &&
    value.priority !== null &&
    value.task !== null
  );
}
