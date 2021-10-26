import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'First Task',
    completed: false,
    index: 1,
  },
  {
    description: 'Second Task',
    completed: true,
    index: 2,
  },
  {
    description: 'Third Task',
    completed: false,
    index: 3,
  },
];
const toDoTasks = document.querySelector('.todo-tasks');

const displayTasks = () => {
  if (tasks.length === 0) return;
  _.forEach(tasks, (value) => {
    const li = document.createElement('li');
    const taskContainer = document.createElement('div');
    const checkBox = document.createElement('input');
    const description = document.createElement('label');
    const icon = document.createElement('i');

    li.className = 'task d-flex-sb';
    taskContainer.className = 'task-container d-flex-center';
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('title', 'Click me to mark task as completed');
    checkBox.setAttribute('name', 'checkbox');
    description.className = 'label';
    icon.className = 'fas fa-ellipsis-v';

    if (value.completed) checkBox.checked = true;
    description.innerText = value.description;

    taskContainer.appendChild(checkBox);
    taskContainer.appendChild(description);
    li.appendChild(taskContainer);
    li.appendChild(icon);
    toDoTasks.appendChild(li);
  });
};

displayTasks();