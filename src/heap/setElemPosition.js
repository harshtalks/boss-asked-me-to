/**
 * @name setElementToPosition
 * @for DWayHeap
 * @private
 * @description
 *
 * Set an element position in the heap, updating its location, if necessary.
 * (We must keep track of the location of each element to speed up the updatePriority method,
 *   which is heavily used in Prim and Dijkstra algorithms).
 *
 * @param {!Array} elements The array of elements in the heap.
 * @param {!Map} positions A map for each (unique) elem in the to the positions in which it is stored.
 * @param {!*} elem  The element to be stored in the heap.
 * @param {!Number} index   The index of the new position of elem in the heap array.
 * @param {?Number} oldIndex  Optional parameter: The old index of elem inside the array.
 * @throws {TypeError(ERROR_MSG_DWAYHEAP_SET_ELEMENT)} If the index parameter is not valid.
 * @return {void}
 *
 */

export default function setElementToPosition(
  elements,
  positions,
  elem,
  index,
  oldIndex
) {
  const priority = elem.priority;
  if (!positions.has(priority)) {
    positions.set(priority, [index]);
  } else {
    oldIndex = Number.parseInt(oldIndex, 10);
    if (!Number.isNaN(oldIndex)) {
      let i = positions.get(priority).indexOf(oldIndex);
      if (i >= 0) {
        positions.get(priority).splice(i, 1);
      }
    }
    positions.get(priority).push(index);
  }
  elements[index] = elem;
}

/**
 * Understanding the flow of this functions
 * 1. check whether the function is a part of positioning mapping.
 * 2 if it does then we gonna find the oldIndex, chop it off, and then push the new index in the position arrray of that index
 * 3. and then elements array will have that elem at that index.
 */
