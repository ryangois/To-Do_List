const form = document.querySelector('form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Get the task list from Local Storage if it exists
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display saved tasks on page load
console.log(savedTasks);
savedTasks.forEach(({text, completed}) => {
  const newTask = createTaskListItem(text, completed);
  taskList.appendChild(newTask);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = createTaskListItem(input.value, false);
  taskList.appendChild(newTask);
  input.value = '';

  // Save the task list to Local Storage
  const tasks = getStoredTasks();
  tasks.push({ text: newTask.querySelector('span').textContent, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  console.log(tasks);
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
    const taskText = e.target.previousSibling.textContent;

    // Update the task list in Local Storage
    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    console.log(updatedTasks);
  } else if (e.target.tagName === 'SPAN') {
    e.target.classList.toggle('completed');
    const taskText = e.target.textContent;

    // Update the task list in Local Storage
    const tasks = getStoredTasks();
    const task = tasks.find(task => task.text === taskText);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(tasks);
  }
});

function createTaskListItem(text, completed) {
  const newTask = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = `${text}`;
  if (completed) {
    taskText.classList.add('completed');
  }
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  newTask.appendChild(taskText);
  newTask.appendChild(deleteBtn);
  return newTask;
}

function getStoredTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
