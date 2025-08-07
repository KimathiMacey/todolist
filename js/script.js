let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

// Load theme
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

function addTask() {
  const input = document.getElementById("taskInput");
  const date = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  const text = input.value.trim();
  if (!text) return alert("Enter a task");

  const task = {
    text,
    due: date || "No due date",
    priority,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "Medium";
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.priority.toLowerCase());
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="task-meta">
        <span>Due: ${task.due}</span>
        <span>Priority: ${task.priority}</span>
      </div>
      <div class="actions">
        <button onclick="toggleDone(${index})">${task.done ? "Undo" : "Done"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})" style="background:red">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim() || tasks[index].text;
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
