const taskInput =
document.getElementById("taskInput");

const noteInput =
document.getElementById("noteInput");

const priority =
document.getElementById("priority");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

const total =
document.getElementById("total");

const done =
document.getElementById("done");

const percent =
document.getElementById("percent");

const search =
document.getElementById("search");

const filter =
document.getElementById("filter");

const themeBtn =
document.getElementById("themeBtn");

let tasks =
JSON.parse(
localStorage.getItem("smartTasks")
) || [];

/* Render */

function renderTasks(){

  taskList.innerHTML = "";

  let filtered =
  tasks.filter(task=>{

    let searchMatch =
    task.text.toLowerCase()
    .includes(
    search.value.toLowerCase()
    );

    let filterMatch = true;

    if(filter.value === "completed"){

      filterMatch =
      task.completed;

    }

    if(filter.value === "pending"){

      filterMatch =
      !task.completed;

    }

    return searchMatch &&
    filterMatch;

  });

  filtered.forEach((task,index)=>{

    const li =
    document.createElement("li");

    li.className =
    `task ${task.completed
    ? "completed"
    : ""}`;

    li.innerHTML = `

      <div class="task-left">

        <strong>${task.text}</strong>

        <small>${task.note}</small>

        <span class="priority
        ${task.priority.toLowerCase()}">

          ${task.priority}

        </span>

      </div>

      <div class="task-buttons">

        <button class="complete">
          ✔
        </button>

        <button class="edit">
          ✏
        </button>

        <button class="delete">
          🗑
        </button>

      </div>

    `;

    /* Complete */

    li.querySelector(".complete")
    .onclick = ()=>{

      task.completed =
      !task.completed;

      saveTasks();

    };

    /* Delete */

    li.querySelector(".delete")
    .onclick = ()=>{

      tasks.splice(index,1);

      saveTasks();

    };

    /* Edit */

    li.querySelector(".edit")
    .onclick = ()=>{

      const updated =
      prompt(
      "Edit Task",
      task.text
      );

      if(updated){

        task.text = updated;

        saveTasks();

      }

    };

    taskList.appendChild(li);

  });

  updateDashboard();

}

/* Add */

addBtn.onclick = ()=>{

  if(taskInput.value.trim() === ""){

    alert("Enter Task");

    return;

  }

  tasks.push({

    text:taskInput.value,

    note:noteInput.value,

    priority:priority.value,

    completed:false

  });

  taskInput.value = "";
  noteInput.value = "";

  saveTasks();

};

/* Save */

function saveTasks(){

  localStorage.setItem(
  "smartTasks",
  JSON.stringify(tasks)
  );

  renderTasks();

}

/* Dashboard */

function updateDashboard(){

  total.innerHTML =
  tasks.length;

  let completed =
  tasks.filter(
  t=>t.completed
  ).length;

  done.innerHTML =
  completed;

  let progress =
  tasks.length === 0
  ? 0
  : Math.round(
  (completed/tasks.length)*100
  );

  percent.innerHTML =
  `${progress}%`;

}

/* Search */

search.oninput =
renderTasks;

/* Filter */

filter.onchange =
renderTasks;

/* Theme */

themeBtn.onclick = ()=>{

  document.body.classList
  .toggle("light");

};

renderTasks();