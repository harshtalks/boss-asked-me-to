/**
 * @name getElementPositions
 * @for DWayHeap
 * @private
 *
 * @description
 *
 * Get the position of the passed element in the heap.
 * (We must keep track of the location of each element to speed up the updatePriority method,
 * which is heavily used in Prim and Dijkstra algorithms).
 *
 * @param {!Map} positions A map for each (unique) elem in the to the positions in which it is stored.
 * @param {!*} elem  The element whose position is to be retrieved.
 *
 * @return {Number}  The position of the element in the heap elements array. If the same element appears
 *                   in more than one positions, the first one in the list is returned (not necessarily
 *                   the smallest one).
 *                   If the element is not contained in the heap, returns -1.
 */

export default function getElementPositions(positions, elem) {
  if (positions.get(elem.priority) && positions.get(elem.priority).length > 0) {
    return positions.get(elem.priority);
  } else return null;
}
