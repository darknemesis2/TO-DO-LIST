const input = document.getElementById("add-input");
const btn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

function addTodo() {
    // Get the task entered by the user
    const task = input.value;

    // Create a new todo object
    const todo = {
        task: task,
        completed: false
    };

    // Get existing todos from localStorage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Add the new todo
    todos.push(todo);

    // Save the updated todos
    localStorage.setItem("todos", JSON.stringify(todos));

    input.value = "";

    display();
}

// Run addTodo when the button is clicked
btn.addEventListener("click", addTodo);

// Run addTodo when the Enter key is pressed
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});


// Display on web page
function display() {

    list.innerHTML = "";

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach((todo, index) => {

        /* List item */
        const li = document.createElement("li");


        /* Checkbox */
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;


        /* Delete Button */
        const dltbtn = document.createElement("button");
        dltbtn.innerText = "Delete";


        /* Edit Button */
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        // Add CSS class
        editBtn.classList.add("edit-btn");


        /* Update Button */
        const updateBtn = document.createElement("button");
        updateBtn.innerText = "Update";

        // Add CSS class
        updateBtn.classList.add("update-btn");

        // Hide initially
        updateBtn.style.display = "none";


        /* Task text */
        const span = document.createElement("span");
        span.textContent = todo.task;

        if (todo.completed) {
            span.classList.add("completed");
        }


        /* Edit Input */
        const editInput = document.createElement("input");

        editInput.type = "text";
        editInput.value = todo.task;

        // Add CSS class
        editInput.classList.add("edit-input");

        // Hide initially
        editInput.style.display = "none";


        /* Checkbox event */
        checkbox.addEventListener("change", function() {

            const todos = JSON.parse(localStorage.getItem("todos")) || [];

            todos[index].completed = checkbox.checked;

            localStorage.setItem("todos", JSON.stringify(todos));

            display();
        });


        /* Delete event */
        dltbtn.addEventListener("click", function() {

            todos.splice(index, 1);

            localStorage.setItem("todos", JSON.stringify(todos));

            display();
        });


        /* Edit event */
        editBtn.addEventListener("click", function() {

            // Hide task text
            span.style.display = "none";

            // Show edit input
            editInput.style.display = "inline";

            // Hide Edit button
            editBtn.style.display = "none";

            // Show Update button
            updateBtn.style.display = "inline";

            // Put cursor inside input
            editInput.focus();
        });


        /* Update event */
        updateBtn.addEventListener("click", function() {

            // Get new task from input
            const newTask = editInput.value;

            // Make sure task is not empty
            if (newTask.trim() !== "") {

                // Update the correct todo
                todos[index].task = newTask;

                // Save updated todos
                localStorage.setItem("todos", JSON.stringify(todos));

                // Display updated list
                display();
            }
        });


        /* Add everything to li */
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(updateBtn);
        li.appendChild(dltbtn);

        list.appendChild(li);
    });
}

display();