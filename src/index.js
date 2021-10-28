import _ from 'lodash';
import './style.css';
import completeTasks from './completeTasks.js';
// eslint-disable-next-line import/no-cycle
import crudFunctionality from './crudFunctionality.js';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const toDoTasks = document.querySelector('.todo-tasks');

export default function displayTasks(newTasks = tasks) {
  if (newTasks.length === 0) {
    toDoTasks.innerHTML = '';
    return;
  }
  toDoTasks.innerHTML = '';
  _.forEach(newTasks, (value, index) => {
    value.index = index + 1;

    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    const description = document.createElement('label');
    const descriptionText = document.createElement('input');
    const icon = document.createElement('i');
    const editIcon = document.createElement('i');

    li.className = 'task d-flex-sb';
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('title', 'Click me to mark task as completed');
    checkBox.setAttribute('name', 'checkbox');
    checkBox.className = 'checkbox';
    description.className = 'label';
    descriptionText.className = 'edit-task';
    icon.className = 'fas fa-ellipsis-v task-icon d-flex-center';
    editIcon.className = 'far fa-trash-alt task-icon d-flex-center';
    editIcon.id = value.index;

    description.style.display = 'none';
    descriptionText.addEventListener('focus', (e) => {
      e.target.nextSibling.style.zIndex = 0;
      e.target.parentNode.style.backgroundColor = '#fffeca';
      e.target.style.backgroundColor = '#fffeca';
    });
    descriptionText.addEventListener('focusout', (e) => {
      setTimeout(() => {
        e.target.nextSibling.style.zIndex = 2;
      }, 300);
      e.target.parentNode.style.backgroundColor = 'white';
      e.target.style.backgroundColor = 'white';
    });

    if (value.completed) checkBox.checked = true;
    description.innerText = value.description;
    descriptionText.setAttribute('value', value.description);

    li.appendChild(checkBox);
    li.appendChild(description);
    li.appendChild(descriptionText);
    li.appendChild(icon);
    li.appendChild(editIcon);
    toDoTasks.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  crudFunctionality(tasks);
  completeTasks(tasks);
}

displayTasks();
completeTasks(tasks);
crudFunctionality(tasks);
