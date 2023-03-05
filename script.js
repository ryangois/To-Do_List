const form = document.querySelector('form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

savedTasks.forEach(({ text, completed }) => {
    const newTask = createTaskListItem(text, completed);
    taskList.appendChild(newTask);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = createTaskListItem(input.value, false);
    taskList.appendChild(newTask);
    input.value = '';

    const tasks = getStoredTasks();
    tasks.push({ text: newTask.querySelector('span').textContent, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(tasks);
});

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const tasks = getStoredTasks();
    // Remove the task from the list and from local storage
    if (target.classList.contains('delete-btn')) {
        const taskText = target.previousSibling.textContent;
        target.parentElement.remove();
        const index = tasks.findIndex(({ text }) => text === taskText);
        tasks.splice(index, 1);
    }
    // Checkbox click
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const taskText = event.target.nextElementSibling.textContent;
        event.target.nextElementSibling.classList.toggle('completed');
        const index = tasks.findIndex(({ text }) => text === taskText);
        tasks[index].completed = !tasks[index].completed;
    }
    // Task box click
    else if (event.target.tagName === 'LI') {
        event.target.querySelector('input[type="checkbox"]').checked = !event.target.querySelector('input[type="checkbox"]').checked;
        event.target.querySelector('span').classList.toggle('completed');
        const taskText = target.textContent;
        const index = tasks.findIndex(({ text }) => text === taskText);
        tasks[index].completed = !tasks[index].completed;
    }
    //Text click
    else if (event.target.tagName === 'SPAN') {
        const taskText = target.textContent;
        const index = tasks.findIndex(({ text }) => text === taskText);
        tasks[index].completed = !tasks[index].completed;
        target.classList.toggle('completed');
        target.parentElement.querySelector('input[type="checkbox"]').checked = tasks[index].completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
});

function createTaskListItem(text, completed) {
    const newTask = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('styled-checkbox'); // Class for checkbox stylization
    checkbox.type = 'checkbox';
    if (completed) {
        checkbox.checked = true;
    }
    const taskText = document.createElement('span');
    taskText.textContent = text;
    if (completed) {
        taskText.classList.add('completed');
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteBtn);
    return newTask;
}

function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}