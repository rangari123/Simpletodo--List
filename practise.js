// get UI Elements
let form = document.getElementById("form"); // Get the form element
let input = document.getElementById("input"); // Get the input element
let todoUL = document.getElementById("todos"); // Get the todos unordered list element

// if there are todos array in local storage, then pass every todo to the addtask function
const todos = JSON.parse(localStorage.getItem("todos")); // Retrieve todos from local storage

if (todos) {
  // If todos exist
  todos.forEach((todo) => addtask(todo)); // Iterate through each todo and call addtask function with todo as parameter
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addtask();
});

function addtask(todo) {
  let todotext = input.value;

  if (todo) {
    todotext = todo.text; // If todo exists, update todotext with the todo's text property
  }

  if (todotext) {
    const li = document.createElement("li"); // Create a new li element

    // if todo exists and 'completed' property is true, add 'completed' class to li
    if (todo && todo.completed) {
      li.classList.add("completed");
    }

    li.innerText = todotext; // Set the inner text of the li element to todotext

    // left click event listener
    li.addEventListener("click", () => {
      li.classList.toggle("completed"); // Toggle the 'completed' class on li
      updateLS(); // Call the updateLS function to update local storage
    });

    // right click event listener
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove(); // Remove the li element from the DOM
      updateLS(); // Call the updateLS function to update local storage
    });

    todoUL.appendChild(li); // Append the li element to the todos unordered list

    input.value = ""; // Clear the input field value

    updateLS(); // Call the updateLS function to update local storage
  }
}

// update local storage
function updateLS() {
  const listItem = document.querySelectorAll("li"); // Get all li elements

  // create todolistArray
  const todolistArray = [];

  // loop through each list item and push all items inside todolistArray
  listItem.forEach((item) => {
    todolistArray.push({
      text: item.innerText, // Get the inner text of the li element
      completed: item.classList.contains("completed"), // Check if li has 'completed' class
    });
  });

  // set todolistArray in local storage
  localStorage.setItem("todos", JSON.stringify(todolistArray)); // Store todolistArray in local storage as a string
}
