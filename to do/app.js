// Load tasks from localStorage if available
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a new task to the list
const addTask = () => {
    const description = document.getElementById('taskDescription').value;
    const date = document.getElementById('taskDate').value;

    if (!description || !date) {
        alert("Please enter both description and date!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        description,
        date: new Date(date),
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    addTaskToDOM(newTask, tasks.length - 1);
    clearInputs();
};

// Add a task to the DOM
const addTaskToDOM = (task, index) => {
    const taskList = document.getElementById('taskList');
    const taskElement = document.createElement('li');
    taskElement.setAttribute('data-index', index);

    const taskContent = document.createElement('span');
    taskContent.className = task.completed ? 'completed' : '';
    taskContent.innerText = `${task.description} - Due: ${task.date.toLocaleString()}`;

    const completeButton = document.createElement('button');
    completeButton.className = 'complete';
    completeButton.innerText = 'Complete';
    completeButton.onclick = () => markAsCompleted(index);

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.innerText = 'Edit';
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteTask(index);

    taskElement.appendChild(taskContent);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);
};

// Mark task as completed
const markAsCompleted = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = true;
    saveTasks(tasks);
    document.querySelector(`[data-index="${index}"] span`).classList.add('completed');
};

// Edit an existing task
const editTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[index];
    const newDescription = prompt("Edit Task Description", task.description);
    if (newDescription) {
        task.description = newDescription;
        saveTasks(tasks);
        document.querySelector(`[data-index="${index}"] span`).innerText = `${task.description} - Due: ${task.date.toLocaleString()}`;
    }
};

// Delete a task
const deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    saveTasks(tasks);
    document.querySelector(`[data-index="${index}"]`).remove();
};

// Clear input fields
const clearInputs = () => {
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDate').value = '';
};

// Event listener for "Add Task" button
document.getElementById('addTaskButton').addEventListener('click', addTask);

// Initialize the app
window.onload = loadTasks;
