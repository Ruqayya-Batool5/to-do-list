// Function to add a new task to the list
function addTask() {
    // Get input elements and the task list container
    const taskInput = document.getElementById('taskInput');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim(); // Remove extra spaces

    // If the task input is empty, show an alert and stop the function
    if (!taskText) 
        return alert('Please enter a task');

    // Create a new task card (a container for each task)
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    // Get the current date for "Created on" info
    const createdDate = new Date().toLocaleDateString();
    // If a deadline is entered, include it, otherwise leave blank
    const deadlineText = taskDeadline.value ? ` | Deadline: ${taskDeadline.value}` : '';

    // Add task content to the card using template literals
    taskCard.innerHTML = `
        <div>
            <input type="checkbox" onclick="toggleComplete(this)"> <!-- Checkbox to mark as completed -->
            <span class="task-title">${taskText}</span>            <!-- Task name -->
        </div>
        <div class="task-info">Created: ${createdDate}${deadlineText}</div> <!-- Creation date and optional deadline -->
        <div class="task-buttons">
            <button onclick="addSubtask(this)">Add Subtask</button>  <!-- Add subtask button -->
            <button onclick="editTask(this)">Edit</button>          <!-- Edit task button -->
            <button onclick="deleteTask(this)">Delete</button>      <!-- Delete task button -->
        </div>
        <div class="subtasks"></div> <!-- Subtasks container -->
    `;

    // Add the new task card to the task list section
    taskList.appendChild(taskCard);

    // Clear the input fields for the next task
    taskInput.value = '';
    taskDeadline.value = '';
}

// Function to toggle a task (or subtask) as complete/incomplete
function toggleComplete(checkbox) {
    const taskCard = checkbox.closest('.task-card'); // Find the parent task card
    taskCard.classList.toggle('completed');          // Add/remove the 'completed' CSS class (strike-through effect)
}

// Function to delete a task
function deleteTask(button) {
    const taskCard = button.closest('.task-card'); // Find the parent task card
    taskCard.remove();                             // Remove the entire card from the list
}

// Function to edit a task's title
function editTask(button) {
    const taskTitle = button.closest('.task-card').querySelector('.task-title'); // Find the task title element
    const newTitle = prompt('Edit Task', taskTitle.innerText); // Prompt user to enter a new name
    if (newTitle) taskTitle.innerText = newTitle;             // Update the title if a new name is given
}

// Function to add a subtask to a task
function addSubtask(button) {
    const subtaskDiv = button.closest('.task-card').querySelector('.subtasks'); // Find the subtask container
    const subtaskText = prompt('Enter Subtask');                                 // Ask user for subtask text
    if (!subtaskText) return;                                                     // Stop if empty

    // Create a subtask item with a checkbox and delete button
    const subtaskItem = document.createElement('div');
    subtaskItem.innerHTML = `
        <input type="checkbox" onclick="toggleComplete(this)"> <!-- Checkbox to mark subtask complete -->
        <span>${subtaskText}</span>                              <!-- Subtask text -->
        <button onclick="deleteSubtask(this)">Delete</button>     <!-- Delete subtask button -->
    `;
    subtaskDiv.appendChild(subtaskItem); // Add subtask to the task card
}

// Function to delete a subtask
function deleteSubtask(button) {
    button.parentElement.remove(); // Remove only the clicked subtask element
}
