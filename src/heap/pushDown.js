/**
 * @name pushDown
 * @for DWayHeap
 * @private
 * @description
 *
 * Reinstate the properties of the heap by pushing down an element towards the leaves
 *
 * @param {!Array} elements The array of elements in the heap.
 * @param {!Map} positions A map for each (unique) elem in the to the positions in which it is stored.
 * @param {!Number} branchFactor The branching factor of the heap.
 * @param {!Function} compare A comparator for heap's elements.
 * @param {Number} index The index of the element to push down the heap.
 *
 * @return {Number} The new position for the element.
 */

import setElementToPosition from "./setElemPosition";

export default function pushDown(
  elements,
  positions,
  branchFactor,
  compare,
  index
) {
  const current = elements[index];
  const n = elements.length;
  let parentIndex = index;

  // first we will get the first child and then assume this is the largest child of the parent node.

  let largestChildIndex = index * branchFactor + 1;

  while (largestChildIndex < n) {
    let largestChild = elements[largestChildIndex];
    let m = Math.min(n, largestChildIndex + branchFactor);
    for (let i = largestChildIndex + 1; i < m; i++) {
      if (compare(elements[i].priority, largestChild.priority) > 0) {
        largestChildIndex = i;
        largestChild = elements[i];
      }
    }

    if (compare(largestChild.priority, current.priority) > 0) {
      setElementToPosition(
        elements,
        positions,
        largestChild,
        parentIndex,
        largestChildIndex
      );
      parentIndex = largestChildIndex;
      largestChildIndex = parentIndex * branchFactor + 1;
    } else {
      break;
    }
  }
  if (parentIndex !== index) {
    setElementToPosition(elements, positions, current, parentIndex, index);
  }
}
