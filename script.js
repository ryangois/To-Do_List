const form = document.querySelector('form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

console.log(savedTasks);
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
    if (target.classList.contains('delete-btn')) {
        const taskText = target.previousSibling.textContent;
        target.parentElement.remove();
        const index = tasks.findIndex(({ text }) => text === taskText);
        tasks.splice(index, 1);
    } else if (event.target.tagName === 'LI') {
        event.target.querySelector('span').classList.toggle('completed');
        const taskText = target.textContent;
        const index = tasks.findIndex(({ text }) => text === taskText);
        tasks[index].completed = !tasks[index].completed;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
});

function createTaskListItem(text, completed) {
    const newTask = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;
    if (completed) {
        taskText.classList.add('completed');
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    newTask.appendChild(taskText);
    newTask.appendChild(deleteBtn);
    return newTask;
}

function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}