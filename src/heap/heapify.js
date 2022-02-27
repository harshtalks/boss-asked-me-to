/**
 * @name heapify
 * @for DWayHeap
 * @private
 * @description
 *
 * Initialize a heap with a set of elements.
 * INVARIANT: elements contains been checked before being passed to heapify,
 *            and MUST be a valid non-empty array.
 *
 * @param {Array} intialElements The initial set of elements to be added to the heap.
 * @return {undefined}
 */
import { ERROR_MSG_DWAYHEAP_CHECK } from "./errors";
import pushDown from "./pushDown";
import setElementToPosition from "./setElemPosition";

export function Heapify(
  elements,
  positions,
  branchFactor,
  compare,
  initialElements
) {
  const n = initialElements.length;

  for (let i = 0; i < n; i++) {
    setElementToPosition(elements, positions, initialElements[i], i);
  }
  let lastInnerNode = Math.floor((n - 1) / branchFactor);
  for (let i = lastInnerNode; i >= 0; i--) {
    pushDown(elements, positions, branchFactor, compare, i);
  }
  console.log(
    "Heapify Action: invariant for this heaps is",
    check(elements, positions, compare)
  );
}

export const check = (elements, branchFactor, compare) => {
  const n = elements.length;

  for (let parentIndex = 0; parentIndex < n; parentIndex++) {
    let parent = elements[parentIndex];
    let childIndex = parentIndex * branchFactor + 1;
    let m = Math.min(n, childIndex + branchFactor);
    for (; childIndex < m; childIndex++) {
      if (compare(elements[childIndex].priority, parent.priority) > 0) {
        throw new Error(ERROR_MSG_DWAYHEAP_CHECK());
      }
    }
  }
  return true;
};
