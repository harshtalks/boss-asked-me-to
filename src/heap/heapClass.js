/**
 * @class DWayHeap
 *
 * A d-way heap (aka d-ary heap or d-heap) is a priority queue data structure, a generalization of the binary
 * heap in which the nodes have d children instead of 2. Thus, a binary heap is a 2-heap.
 * D-way heaps are pretty useful in practice in the implementation of Dijkstra and Prim algorithms
 * for graphs, among many other things.
 * While Fibonacci's heaps would be theoretically faster, no simple and fast implementation of such data structures is known.
 * In practice, a 4-way heap is the best solution for the priority queues in these algorithms.
 *
 * This implementation uses a Map to store keys positions inside the heap.
 * This has 3 important consequences:
 * 1. You can store both literals and objects in the heap.
 * 2. If you store an object, to retrieve it you need to pass to .get() the same object. Different objects, even if
 *    containing the same fields, are not considered equal. This is due to a limitation of Maps
 *    (see http://www.2ality.com/2015/01/es6-maps-sets.html).
 * 3. References to the objects stored are held until they are removed from the heap. If we used a WeakMap instead,
 *    references would have been held weakly, allowing garbage collector to dispose those objects if not used elsewhere.
 *    So, for example:
 *
 *      const map = new Map();
 *      let x = [], y = [];
 *      map.set(x, 1);
 *      console.log(map.has(x)); // Will print false
 *
 *    WeekMaps, however, doesn't allow primitive values, so heap keys would have had to be objects.
 */

import bubbleUp from "./bubbleUp";
import Compare from "./compare";
import {
  ERROR_MSG_DWAYHEAP_CONSTRUCTOR_FST_PARAM,
  ERROR_MSG_DWAYHEAP_CONSTRUCTOR_SND_PARAM,
  ERROR_MSG_DWAYHEAP_CONSTRUCTOR_TRD_PARAM,
  ERROR_MSG_DWAYHEAP_EMPTY_HEAP,
  ERROR_MSG_DWAYHEAP_PUSH,
  ERROR_MSG_DWAYHEAP_ELEMENT_POSITION,
  ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY_API,
  ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY
} from "./errors";
import getElementPositions from "./getElem";
import { Heapify } from "./heapify";
import pushDown from "./pushDown";
import removeElementFromPosition from "./removeElem";
import setElementToPosition from "./setElemPosition";
import validateElement from "./validateElem";

import {
  _branchFactor,
  _bubbleUp,
  _compare,
  _elements,
  _getElementPositions,
  _positions,
  _pushDown,
  _removeElementFromPosition,
  _setElemetToPosition
} from "./weakMaps";

class DWayHeap {
  constructor(branchFactor = 2, elements = [], compare = Compare) {
    const bF = Number.parseInt(branchFactor, 10);

    // some important fun validation on your way
    if (Number.isNaN(bF) || _branchFactor < 2) {
      throw new TypeError(ERROR_MSG_DWAYHEAP_CONSTRUCTOR_FST_PARAM(bF));
    }

    console.log(elements);

    // so this was easy, wasnt it?? you know what lets do the same for elements:

    if (
      elements === undefined ||
      elements === null ||
      !Array.isArray(elements)
    ) {
      throw new TypeError(ERROR_MSG_DWAYHEAP_CONSTRUCTOR_SND_PARAM(elements));
    }

    // haha. i know you're enjoying it. okay one more time. okay this will be last time.
    if (
      typeof compare === "undefined" ||
      typeof compare !== "function" ||
      compare.length !== 2
    ) {
      throw new TypeError(ERROR_MSG_DWAYHEAP_CONSTRUCTOR_TRD_PARAM(compare));
    }

    // okay i guess you are done with this stupid typecasting and error throwing.
    // now lets bind our cute little helpers to weak maps
    console.log(branchFactor);
    _branchFactor.set(this, bF);
    _compare.set(this, compare);
    _positions.set(this, new Map());
    _elements.set(this, []);

    // more fun

    _bubbleUp.set(
      this,
      bubbleUp.bind(
        this,
        _elements.get(this),
        _positions.get(this),
        _branchFactor.get(this),
        _compare.get(this)
      )
    );

    // similarly for our pushDown

    _pushDown.set(
      this,
      pushDown.bind(
        this,
        _elements.get(this),
        _positions.get(this),
        _branchFactor.get(this),
        _compare.get(this)
      )
    );

    _setElemetToPosition.set(
      this,
      setElementToPosition.bind(this, _elements.get(this), _positions.get(this))
    );

    // again

    _removeElementFromPosition.set(
      this,
      removeElementFromPosition.bind(
        this,
        _elements.get(this),
        _positions.get(this)
      )
    );

    _getElementPositions.set(
      this,
      getElementPositions.bind(this, _positions.get(this))
    );

    console.log("** heapify Called **");
    Heapify(
      _elements.get(this),
      _positions.get(this),
      _branchFactor.get(this),
      _compare.get(this),
      elements
    );
  }

  /**
   * @name size
   * @for DWayHeap
   * @getter
   * @description
   *
   * Return the number of elements stored in the heap.
   *
   * @return {Number} The number of elements in the heap.
   */

  get size() {
    return _elements.get(this).length;
  }

  /**
   * @name isEmpty
   * @for DWayHeap
   * @description
   *
   * Check if the heap is empty.
   *
   * @return {Boolean} True <=> the heap is empty, false otherwise.
   */

  isEmpty() {
    return this.size === 0;
  }

  /**
   * @name branchFactor
   * @for DWayHeap
   * @getter
   * @description
   * Return the branch factor of current heap.
   *
   * @returns {number} The branch factor for this heap.
   */
  get branchFactor() {
    return _branchFactor.get(this);
  }

  /**
   * @name contains
   * @for DWayHeap
   *
   * Returns true if the element is stored in the heap, false otherwise
   *
   * @param {!*} elem  The element to look for.
   *
   * @return {Boolean}   true <=> The element is stored in the heap.
   */

  contains(elem) {
    let ps = _getElementPositions.get(this)(elem);
    return ps !== null && ps.length > 0;
  }

  /**
   * @name push
   * @for DWayHeap
   *
   * Add an element to the heap, taking care of reinstating heap's properties.
   *
   * @param {*} elem   The element to add to the heap. Must be a comparable element.
   *
   * @return {Object} The heap itself, to comply with the chaining pattern.
   * @throws {TypeError(ERROR_MSG_DWAYHEAP_PUSH)}  Throws an error if the first parameter is undefined or null.
   */

  push(elem) {
    const n = this.size;
    if (!validateElement(elem)) {
      //The only three types that can't be accepted
      throw new TypeError(ERROR_MSG_DWAYHEAP_PUSH(elem));
    }
    _setElemetToPosition.get(this)(elem, n);
    _bubbleUp.get(this)(n);

    return this;
  }

  /**
   * @name peek
   * @for DWayHeap
   *
   * If the heap is not empty, return a reference to the first element in the heap.
   *
   * @return {*} A deep copy of the top element in the heap
   * @throws {Error(ERROR_MSG_DWAYHEAP_EMPTY_HEAP)}  Throws an error if the heap is empty.
   */

  peek() {
    if (this.isEmpty()) {
      throw new Error(ERROR_MSG_DWAYHEAP_EMPTY_HEAP());
    }
    return JSON.parse(JSON.stringify(_elements.get(this)[0]));
  }

  /**
   * @name top
   * @for DWayHeap
   *
   * If the heap is not empty, return the first element in the heap, after removing it from the data structure;
   * The heap properties are then reinstated.
   *
   * @return {*} A reference to the top element in the heap
   * @throws {Error(ERROR_MSG_DWAYHEAP_EMPTY_HEAP)}  Throws an error if the heap is empty.
   */

  top() {
    const n = this.size;

    switch (n) {
      case 0:
        throw new Error(ERROR_MSG_DWAYHEAP_EMPTY_HEAP());
      case 1:
        return _removeElementFromPosition.get(this)(0, true);
      default:
        let topElem = _removeElementFromPosition.get(this)(0, false);
        let elem = _removeElementFromPosition.get(this)(n - 1, true);
        _setElemetToPosition.get(this)(elem, 0, n - 1);
        _pushDown.get(this)(0);

        return topElem;
    }
  }

  /**
   * @name updatePriority
   * @for DWayHeap
   *
   * Updates all the element stored in the heap matching oldValue, possibly changing its priority;
   * then it takes care of reinstating heap's properties.
   * If the new priority is greater (i.e. newValue < oldValue) the new element will be pushed toward the root,
   * if it's smaller (i.e. newValue > oldValue) it will be pushed towards the leaves.
   * **WARNING** Be advised that all the occurrences of the old value will be replaced with the instance of the new value passed.
   *             In case `newValue` is an object, the same reference will replace all the occurrences of oldValue.
   *
   * @param {*} oldValue   The element to be updated. MUST be in the heap.
   * @param {*} newValue   The new value for the element.
   *
   * @return {Object} The heap itself, to comply with the chaining pattern.
   * @throws {RangeError(ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY)}  Throws an error if the first parameter is undefined or null.
   * @throws {RangeError(ERROR_MSG_DWAYHEAP_ELEMENT_POSITION)}  Throws an error if the first parameter is undefined or null.
   */

  updatePriority(oldValue, newValue) {
    const compareResult = _compare.get(this)(
      newValue.priority,
      oldValue.priority
    );
    const n = this.size;
    if (!this.contains(oldValue)) {
      throw new RangeError(ERROR_MSG_DWAYHEAP_ELEMENT_POSITION(oldValue));
    }

    let indices = _getElementPositions(this)(oldValue);

    if (!validateElement(newValue)) {
      //The only three types that can't be accepted
      throw new TypeError(ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY_API(newValue));
    }

    for (let i of indices) {
      if (i < 0 || i > n) {
        throw new RangeError(ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY(newValue));
      }
      _setElemetToPosition.get(this, newValue);
    }
    if (compareResult > 0) {
      //Priority decreases so the element will have to move up to the root. We have to start from smaller indices.
      indices = indices.sort((x, y) => x - y);
      for (let i of indices) {
        _bubbleUp.get(this)(i);
      }
    } else if (compareResult < 0) {
      //Priority decreases so the element will have to move down to leaves. We have to start from larger indices.
      indices = indices.sort((x, y) => y - x);
      for (let i of indices) {
        _pushDown.get(this)(i);
      }
    }

    return this;
  }

  watch() {
    const n = this.size;
    if (!n) {
      throw new Error(ERROR_MSG_DWAYHEAP_EMPTY_HEAP());
    }
    console.log("** WATCH HEAP **");
    for (let i = 0; i < n; i++) {
      console.log(JSON.stringify(_elements.get(this)[i]));
    }
  }

  /**
   *
   */

  /**
   * @name heapRenderer
   * @for DWayHeap
   * @description
   * Now we will render all the heap elements. for this we will be passing, container element, required ui parameters
   *
   * @param {HTMLElement} container   The element to be updated. MUST be in the heap.
   * @param {*}    The new value for the element.
   *
   * @return {Object} The heap itself, to comply with the chaining pattern.
   * @throws {RangeError(ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY)}  Throws an error if the first parameter is undefined or null.
   * @throws {RangeError(ERROR_MSG_DWAYHEAP_ELEMENT_POSITION)}  Throws an error if the first parameter is undefined or null.
   */

  heapRenderer(container) {
    container.innerHTML = "";
    const n = this.size;
    if (!n) {
      throw new Error(ERROR_MSG_DWAYHEAP_EMPTY_HEAP());
    }
    for (let i = 0; i < n; i++) {
      const elem = _elements.get(this)[i];
      const html = ` <div class="item p-5 border-2 my-3">
      <h2 class="font-bold text-xl">${elem.task}</h2>
      <p>Priority: ${elem.priority}</p>
    </div>`;

      container.insertAdjacentHTML("beforeend", html);
    }
  }
  /**
   *
   * @param {Number} containsPriorityNumber
   */

  containsPriorityNumber(num) {
    return _elements.get(this).find((el) => el.priority === num);
  }
}

export default DWayHeap;
