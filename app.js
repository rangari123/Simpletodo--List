// get UI Elements

let form = document.getElementById("form");
let input = document.getElementById("input");
let todoUL = document.getElementById("todos");

// if there are todos array in ls then pass every todo to addtask function

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addtask(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addtask();
});

function addtask(todo) {
  let todotext = input.value;

  if (todo) {
    todotext = todo.text;
  }
  if (todotext) {
    const li = document.createElement("li");
    // if todo exist and enter is being hit add add in ul then only
    if (todo && todo.completed) {
      li.classList.add("completed");
    }
    li.innerText = todotext;

    // left click
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateLS();
    });
    // right click
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
      updateLS();
    });

    todoUL.appendChild(li);

    input.value = "";

    // localstorage
    updateLS();
  }
}

// update ls

function updateLS() {
  const listItem = document.querySelectorAll("li");

  // create tolistArray
  const todolistArray = [];

  // loop throught each list items and push all items inside list array.

  listItem.forEach((item) => {
    todolistArray.push({
      text: item.innerText,
      completed: item.classList.contains("completed"),
    });
  });

  // set listitem in ls
  localStorage.setItem("todos", JSON.stringify(todolistArray));
}
