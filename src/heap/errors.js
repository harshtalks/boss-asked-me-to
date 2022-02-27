export const ERROR_MSG_DWAYHEAP_CONSTRUCTOR_SND_PARAM = (val) =>
  `Illegal argument for DWayHeap constructor: elements ${val}`;
export const ERROR_MSG_DWAYHEAP_CHECK = () => `Heap Properties Violated`;
export const ERROR_MSG_DWAYHEAP_CONSTRUCTOR_FST_PARAM = (val) =>
  `Illegal argument for DWayHeap constructor: branchFactor ${val}`;
export const ERROR_MSG_DWAYHEAP_CONSTRUCTOR_TRD_PARAM = (val) =>
  `Illegal argument for DWayHeap constructor: compare ${val}`;
export const ERROR_MSG_DWAYHEAP_PUSH = (val) =>
  `Illegal argument for push: ${JSON.stringify(val)}`;
export const ERROR_MSG_DWAYHEAP_EMPTY_HEAP = () => `Invalid Status: Empty Heap`;
export const ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY = (val) =>
  `Out of range argument: element ${val} not stored in the heap`;
export const ERROR_MSG_DWAYHEAP_UPDATE_PRIORITY_API = (val) =>
  `Illegal argument for updatePriority: ${val}`;
export const ERROR_MSG_DWAYHEAP_ELEMENT_POSITION = (val) =>
  `Error: can't find position for elem:  ${val}`;
