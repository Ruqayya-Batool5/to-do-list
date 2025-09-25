// Set min attribute so past date/time can't be selected
const deadlineInput = document.getElementById('taskDeadline');
function setMinDate() {
    const now = new Date();
    const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
                          .toISOString().slice(0,16);
    deadlineInput.min = localISOTime;
}
setMinDate();

function addTask() {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescInput = document.getElementById('taskDescription');
    const taskDeadline = document.getElementById('taskDeadline');
    const extraNotes = document.getElementById('extraNotes');
    const taskList = document.getElementById('taskList');

    const titleText = taskTitleInput.value.trim();
    const descText = taskDescInput.value.trim();
    const notesText = extraNotes.value.trim();

    if (!titleText) return; // No pop-up, just ignore if empty title

    const now = new Date();
    const createdDate = now.toLocaleString();

    // Deadline check: must be at least 1 hour later
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

    // Task card
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
        <div>
            <input type="checkbox" onclick="toggleComplete(this)">
            <span class="task-title"><strong>${titleText}</strong></span>
        </div>
        <div class="task-description">${descText || '(No description provided)'}</div>
        ${notesText ? `<div class="task-notes">Notes: ${notesText}</div>` : ''}
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
    extraNotes.value = '';
    taskDeadline.value = '';
    setMinDate(); // reset min after adding
}

function toggleComplete(checkbox) {
    const taskCard = checkbox.closest('.task-card');
    taskCard.classList.toggle('completed');
}

function deleteTask(button) {
    button.closest('.task-card').remove();
}

function editTask(button) {
    const taskCard = button.closest('.task-card');
    const taskTitle = taskCard.querySelector('.task-title');
    const taskDesc = taskCard.querySelector('.task-description');

    const newTitle = prompt('Edit Task Title', taskTitle.innerText);
    const newDesc = prompt('Edit Task Description', taskDesc.innerText);

    if (newTitle) taskTitle.innerHTML = `<strong>${newTitle}</strong>`;
    if (newDesc !== null) taskDesc.innerText = newDesc;
}

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

function editSubtask(button) {
    const subtaskTitle = button.parentElement.querySelector('.subtask-title');
    const newTitle = prompt('Edit Subtask', subtaskTitle.innerText);
    if (newTitle) subtaskTitle.innerText = newTitle;
}

function deleteSubtask(button) {
    button.parentElement.remove();
}
