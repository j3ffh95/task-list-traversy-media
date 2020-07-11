// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

// Load all event listeners function declaration
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addtask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
}

// Add Task
function addtask(e) {
  if (taskInput.value === "") {
    alert("Add a task!");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete this task?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear tasks function
function clearTasks(e) {
  // taskList.innerHTML = "";

  // Faster method to clear using a loop
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
