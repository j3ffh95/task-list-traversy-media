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
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
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

  // Store in Local Storage
  storeTaskinLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task function
function storeTaskinLocalStorage(task) {
  let tasks;
  // If there is nothing in the local storage in the key tasks then set it up as an empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // otherwise get the array and set it to tasks variable
    // since the local storage stores strings only of json data then we need to parse it to a regular array using JSON.parse()
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //Then we push the task to the array tasks;
  tasks.push(task);
  //then we set the Local Storage with the new added task
  // we need to transform the array of tasks to a JSON string so we use the JSON.stringify() method;
  localStorage.setItem("tasks", JSON.stringify(tasks));
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

// Filter tasks function
function filterTasks(e) {
  // set a var text to get user input
  const text = e.target.value.toLowerCase();

  // queryselectorAll returns a Node list so then that allows us to use the forEach method.
  // elementsByClassName returns an HTML collection;
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
