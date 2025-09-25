// Prevent past deadlines
const deadlineInput = document.getElementById('taskDeadline');
function setMinDate() {
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
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

  if (!titleText) return;

  const now = new Date();
  const createdDate = now.toLocaleString();

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
      <button onclick="showSubtaskForm(this)">Add Subtask</button>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>
    </div>
    <div class="subtasks"></div>
  `;

  taskList.appendChild(taskCard);

  taskTitleInput.value = '';
  taskDescInput.value = '';
  extraNotes.value = '';
  taskDeadline.value = '';
  setMinDate();
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

/* ==== Subtasks ==== */
function showSubtaskForm(button) {
  const subtaskDiv = button.closest('.task-card').querySelector('.subtasks');

  const form = document.createElement('div');
  form.className = 'subtask-form';
  form.innerHTML = `
    <input type="text" placeholder="Subtask Title" class="subtask-input-title">
    <textarea placeholder="Subtask Description (optional)" class="subtask-input-desc"></textarea>
    <button onclick="saveSubtask(this)">Save Subtask</button>
  `;
  subtaskDiv.appendChild(form);
}

function saveSubtask(button) {
  const form = button.parentElement;
  const title = form.querySelector('.subtask-input-title').value.trim();
  const desc = form.querySelector('.subtask-input-desc').value.trim();
  if (!title) return;

  const subtaskItem = document.createElement('div');
  subtaskItem.className = 'subtask-item';
  subtaskItem.innerHTML = `
    <input type="checkbox" onclick="toggleComplete(this)">
    <span class="subtask-title"><strong>${title}</strong></span>
    <div class="subtask-description">${desc || '(No description provided)'}</div>
    <button onclick="editSubtask(this)">Edit</button>
    <button onclick="deleteSubtask(this)">Delete</button>
  `;

  form.parentElement.appendChild(subtaskItem);
  form.remove();
}

function editSubtask(button) {
  const subtaskItem = button.closest('.subtask-item');
  const titleEl = subtaskItem.querySelector('.subtask-title');
  const descEl = subtaskItem.querySelector('.subtask-description');

  const newTitle = prompt('Edit Subtask Title', titleEl.innerText);
  const newDesc = prompt('Edit Subtask Description', descEl.innerText);

  if (newTitle) titleEl.innerHTML = `<strong>${newTitle}</strong>`;
  if (newDesc !== null) descEl.innerText = newDesc;
}

function deleteSubtask(button) {
  button.closest('.subtask-item').remove();
}
