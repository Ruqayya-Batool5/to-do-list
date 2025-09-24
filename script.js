// Add a new task with title and description
function addTask() {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescInput = document.getElementById('taskDescription');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskList = document.getElementById('taskList');

    const titleText = taskTitleInput.value.trim();
    const descText = taskDescInput.value.trim();

    if (!titleText) return alert('Please enter a task title');

    // Current date & time
    const now = new Date();
    const createdDate = now.toLocaleString();

    // Validate deadline
    let deadlineText = '';
    if (taskDeadline.value) {
        const deadline = new Date(taskDeadline.value);
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
        if (deadline < oneHourLater) {
            alert('Deadline must be at least 1 hour after creation time.');
            return;
        }
        deadlineText = ` | Deadline: ${deadline.toLocaleString()}`;
    }

    // Create a task card
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
        <div>
            <input type="checkbox" onclick="toggleComplete(this)">
            <span class="task-title"><strong>${titleText}</strong></span>
        </div>
        <div class="task-description">${descText ? descText : '(No description provided)'}</div>
        <div class="task-info">Created: ${createdDate}${deadlineText}</div>
        <div class="task-buttons">
            <button onclick="addSubtask(this)">Add Subtask</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
        <div class="subtasks"></div>
    `;

    taskList.appendChild(taskCard);

    // Clear fields
    taskTitleInput.value = '';
    taskDescInput.value = '';
    taskDeadline.value = '';
}

// Toggle complete
function toggleComplete(checkbox) {
    const taskCard = checkbox.closest('.task-card');
    taskCard.classList.toggle('completed');
}

// Delete task
function deleteTask(button) {
    button.closest('.task-card').remove();
}

// Edit task title and description
function editTask(button) {
    const taskCard = button.closest('.task-card');
    const taskTitle = taskCard.querySelector('.task-title');
    const taskDesc = taskCard.querySelector('.task-description');

    const newTitle = prompt('Edit Task Title', taskTitle.innerText);
    const newDesc = prompt('Edit Task Description', taskDesc.innerText);

    if (newTitle) taskTitle.innerHTML = `<strong>${newTitle}</strong>`;
    if (newDesc !== null) taskDesc.innerText = newDesc;
}

// Add a subtask
function addSubtask(button) {
    const subtaskDiv = button.closest('.task-card').querySelector('.subtasks');
    const subtaskText = prompt('Enter Subtask');
    if (!subtaskText) return;

    const subtaskItem = document.createElement('div');
    subtaskItem.innerHTML = `
        <input type="checkbox" onclick="toggleComplete(this)">
        <span class="subtask-title">${subtaskText}</span>
        <button onclick="editSubtask(this)">Edit</button>
        <button onclick="deleteSubtask(this)">Delete</button>
    `;
    subtaskDiv.appendChild(subtaskItem);
}

// Edit subtask
function editSubtask(button) {
    const subtaskTitle = button.parentElement.querySelector('.subtask-title');
    const newTitle = prompt('Edit Subtask', subtaskTitle.innerText);
    if (newTitle) subtaskTitle.innerText = newTitle;
}

// Delete subtask
function deleteSubtask(button) {
    button.parentElement.remove();
}
