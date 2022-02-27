/**
 * @name removeElementFromPosition
 * @for DWayHeap
 * @private
 * @description
 *
 * Remove an element at a certain position in the heap, updating its location, if necessary.
 * (We must keep track of the location of each element to speed up the updatePriority method,
 * which is heavily used in Prim and Dijkstra algorithms).
 *
 * @param {!Array} elements The array of elements in the heap.
 * @param {!Map} positions A map for each (unique) elem in the to the positions in which it is stored.
 * @param {!Number} index   The index of the new position of elem in the heap array.
 * @param {?Boolean} splice   Optional parameter: flag to state if the element must also be esponged from the array.
 *
 * @return {*} The element stored at index.
 * @throws {TypeError(ERROR_MSG_DWAYHEAP_REMOVE_ELEMENT)} If the index parameter is not valid.
 */

export default function removeElementFromPosition(
  elements,
  positions,
  index,
  splice
) {
  const elem = elements[index];

  const i = positions.get(elem.priority).indexOf(index);

  if (i >= 0) {
    positions.get(elem.priority).splice(i, 1);
  }

  if (splice) {
    elements.splice(index, 1);
  }

  return elem;
}
