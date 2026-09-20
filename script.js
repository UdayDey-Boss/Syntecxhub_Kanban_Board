/* =========================================================
   Driftboard — Kanban Board
   Syntecxhub Internship | Front-End Development | Project 2
   ========================================================= */

const STORAGE_KEY = "syntecxhub_kanban_tasks";
const STATUSES = ["todo", "doing", "done"];

/** @type {{id:string, text:string, status:string}[]} */
let tasks = loadTasks();

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks();
  } catch {
    return seedTasks();
  }
}

function seedTasks() {
  return [
    { id: crypto.randomUUID(), text: "Read the internship instructions", status: "done" },
    { id: crypto.randomUUID(), text: "Set up the GitHub repository", status: "doing" },
    { id: crypto.randomUUID(), text: "Submit weekly task via the form", status: "todo" },
  ];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  STATUSES.forEach((status) => {
    const list = document.getElementById(`list-${status}`);
    const count = document.getElementById(`count-${status}`);
    const columnTasks = tasks.filter((t) => t.status === status);

    list.innerHTML = "";
    count.textContent = columnTasks.length;

    if (columnTasks.length === 0) {
      const hint = document.createElement("div");
      hint.className = "empty-hint";
      hint.textContent = "Drop a task here";
      list.appendChild(hint);
      return;
    }

    columnTasks.forEach((task) => list.appendChild(buildCard(task)));
  });
}

function buildCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.draggable = true;
  card.dataset.id = task.id;
  card.dataset.status = task.status;

  const text = document.createElement("p");
  text.textContent = task.text;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.type = "button";
  removeBtn.setAttribute("aria-label", "Remove task");
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => removeTask(task.id));

  card.append(text, removeBtn);

  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", task.id);
    event.dataTransfer.effectAllowed = "move";
    requestAnimationFrame(() => card.classList.add("dragging"));
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  return card;
}

function addTask(status, text) {
  tasks.push({ id: crypto.randomUUID(), text: text.trim(), status });
  saveTasks();
  render();
}

function removeTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function moveTask(id, newStatus) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.status = newStatus;
  saveTasks();
  render();
}

// --- Add-task forms ---
document.querySelectorAll(".add-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const value = input.value.trim();
    if (!value) return;
    addTask(form.dataset.status, value);
    input.value = "";
    input.focus();
  });
});

// --- Drag and drop targets (native HTML5 Drag and Drop API) ---
document.querySelectorAll(".card-list").forEach((list) => {
  list.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    list.classList.add("drag-over");
  });

  list.addEventListener("dragleave", () => {
    list.classList.remove("drag-over");
  });

  list.addEventListener("drop", (event) => {
    event.preventDefault();
    list.classList.remove("drag-over");
    const id = event.dataTransfer.getData("text/plain");
    moveTask(id, list.dataset.status);
  });
});

// --- Clear board ---
document.getElementById("clearBoard").addEventListener("click", () => {
  if (!confirm("Remove all tasks from the board?")) return;
  tasks = [];
  saveTasks();
  render();
});

render();
