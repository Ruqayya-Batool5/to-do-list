// Function to add a new task to the list
function addTask() {
    // Get input elements and the task list container
    const taskInput = document.getElementById('taskInput');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim(); // Remove extra spaces from input

    // If the task input is empty, show an alert and stop the function
    if (!taskText) return alert('Please enter a task');

    // Get current date & time for "Created" info
    const now = new Date();
    const createdDate = now.toLocaleString(); // show both date & time

    // Check if a deadline is selected and validate it
    let deadlineText = '';
    if (taskDeadline.value) {
        const deadline = new Date(taskDeadline.value);
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour from now

        // If the deadline is less than 1 hour away, show alert and stop
        if (deadline < oneHourLater) {
            alert('Deadline must be at least 1 hour after creation time.');
            return;
        }
        // Add deadline to display if valid
        deadlineText = ` | Deadline: ${deadline.toLocaleString()}`;
    }

    // Create a new task card (main container for a task)
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
        <div>
            <input type="checkbox" onclick="toggleComplete(this)">
            <span class="task-title">${taskText}</span>
        </div>
        <div class="task-info">Created: ${createdDate}${deadlineText}</div>
        <div class="task-buttons">
            <button onclick="addSubtask(this)">Add Subtask</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
        <div class="subtasks"></div>
    `;

    // Add the new task card to the task list
    taskList.appendChild(taskCard);

    // Clear input fields after adding the task
    taskInput.value = '';
    taskDeadline.value = '';
}

// Toggle complete (mark task or subtask as done)
function toggleComplete(checkbox) {
    const taskCard = checkbox.closest('.task-card');
    // Add or remove the "completed" class to strike through text
    taskCard.classList.toggle('completed');
}

// Delete a task (remove the entire task card)
function deleteTask(button) {
    button.closest('.task-card').remove();
}

// Edit main task title
function editTask(button) {
    const taskTitle = button.closest('.task-card').querySelector('.task-title');
    const newTitle = prompt('Edit Task', taskTitle.innerText);
    if (newTitle) taskTitle.innerText = newTitle;
}

// Add a subtask to a specific task
function addSubtask(button) {
    const subtaskDiv = button.closest('.task-card').querySelector('.subtasks');
    const subtaskText = prompt('Enter Subtask');
    if (!subtaskText) return;

    // Create a new subtask item
    const subtaskItem = document.createElement('div');
    subtaskItem.innerHTML = `
        <input type="checkbox" onclick="toggleComplete(this)">
        <span class="subtask-title">${subtaskText}</span>
        <button onclick="editSubtask(this)">Edit</button>
        <button onclick="deleteSubtask(this)">Delete</button>
    `;
    subtaskDiv.appendChild(subtaskItem);
}

// Edit a subtask title
function editSubtask(button) {
    const subtaskTitle = button.parentElement.querySelector('.subtask-title');
    const newTitle = prompt('Edit Subtask', subtaskTitle.innerText);
    if (newTitle) subtaskTitle.innerText = newTitle;
}

// Delete a subtask
function deleteSubtask(button) {
    button.parentElement.remove();
}
