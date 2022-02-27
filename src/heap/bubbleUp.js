/**
 * @name bubbleUp
 * @for DWayHeap
 * @private
 * @description
 *
 * Reinstate the properties of the heap by bubbling an element up to the root
 *
 * @param {!Array} elements The array of elements in the heap.
 * @param {!Map} positions A map for each (unique) elem in the to the positions in which it is stored.
 * @param {!Number} branchFactor The branching factor of the heap.
 * @param {!Function} compare A comparator for heap's elements.
 * @param {!Number} index The index of the element to move towards the root of the heap.
 *
 * @return {Number} The new position for the element.
 */

// we are implementing max heap => big value === big priority
import setElementToPosition from "./setElemPosition";

/**
 * @name bubbleUp
 * @for DWayHeap
 * @private
 * @description
 *
 * Reinstate the properties of the heap by bubbling an element up to the root
 *
 * @param {!Array} elements The array of elements in the heap.
 * @param {!Map} positions A map for each (unique) elem in the to the positions in which it is stored.
 * @param {!Number} branchFactor The branching factor of the heap.
 * @param {!Function} compare A comparator for heap's elements.
 * @param {!Number} index The index of the element to move towards the root of the heap.
 *
 * @return {Number} The new position for the element.
 */

export default function bubbleUp(
  elements,
  positions,
  branchFactor,
  compare,
  index
) {
  const current = elements[index];
  let i = index;

  while (i > 0) {
    let parentIndex = Math.floor((i - 1) / branchFactor);
    if (compare(current.priority, elements[parentIndex].priority) > 0) {
      setElementToPosition(
        elements,
        positions,
        elements[parentIndex],
        i,
        parentIndex
      );
      i = parentIndex;
    } else break;
  }

  if (i !== index) {
    setElementToPosition(elements, positions, current, i, index);
  }
}
