const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("themeToggle");
const datetime = document.getElementById("datetime");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleComplete(index));

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.addEventListener("click", () => editTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("টাস্ক আপডেট করুন:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function setThemeFromStorage() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
}

function updateDateTime() {
  const now = new Date();
  datetime.textContent = now.toLocaleString("bn-BD", {
    dateStyle: "full",
    timeStyle: "medium"
  });
}

setInterval(updateDateTime, 1000);
setThemeFromStorage();
renderTasks();
