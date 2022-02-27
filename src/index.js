import { dummyTasks } from "./helper";
import dWayHeap from "./heap/heapClass";

const itemsContainer = document.querySelector(".items");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const button = document.getElementById("submitButton");
const deleteButton = document.getElementById("removeTop");

const branchfactor = 2;
const tasks = dummyTasks();

const heap = new dWayHeap(branchfactor, tasks);

const renderTasks = () => {
  heap.heapRenderer(itemsContainer);
};

renderTasks();

const addNewTask = () => {
  if (taskInput.value === "" || priorityInput.value === "") {
    alert(
      "Input fields are empty. mann add something im not an AI to get into your mind."
    );
  }
  const task = taskInput.value;
  const priority = +priorityInput.value;
  if (Number.isNaN(priority)) {
    alert("Please Enter a valid number for priority.");
    priorityInput.value = "";
    taskInput.value = "";
    return;
  }
  const TaskObject = { task: task, priority: priority };
  console.log(TaskObject);
  if (heap.containsPriorityNumber(priority)) {
    alert("Bro, dont trick me, i know this priority is already taken.");
    priorityInput.value = "";
    return;
  }
  heap.push({ ...TaskObject });
  heap.watch();
  renderTasks();
  priorityInput.value = "";
  taskInput.value = "";
};

button.addEventListener("click", addNewTask);

const deleteTask = () => {
  heap.top();
  renderTasks();
};

deleteButton.addEventListener("click", deleteTask);
