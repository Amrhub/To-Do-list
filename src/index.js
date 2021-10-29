/* eslint-disable import/no-cycle */
import _ from 'lodash';
import './style.css';
import completeTasks from './completeTasks.js';
import crudFunctionality, { setEventListeners } from './crudFunctionality.js';
import additionalFeatures from './additionalFeatures.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const toDoTasks = document.querySelector('.todo-tasks');
const instructions = [
  {
    description: 'Double-tap to edit (enter to save changes)',
    completed: false,
    test: true,
    index: 1,
  },
  {
    description: 'Double-tap then tap trash can icon to delete a task',
    completed: false,
    test: true,
    index: 2,
  },
  {
    description: "Drag 'n drop to reorder your list",
    completed: false,
    test: true,
    index: 3,
  },
  {
    description: 'Manage all your lists in one place',
    completed: false,
    test: true,
    index: 4,
  },
  {
    description: 'Resync to clear out the instructions',
    completed: false,
    test: true,
    index: 5,
  },
];
export default function displayTasks(newTasks = tasks) {
  toDoTasks.innerHTML = '';
  _.forEach(newTasks, (value, index) => {
    value.index = index + 1;

    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    const description = document.createElement('label');
    const descriptionText = document.createElement('input');
    const icon = document.createElement('i');
    const editIcon = document.createElement('i');

    if (value.test) li.id = 'test';
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
  tasks = newTasks;
  setEventListeners();
  completeTasks();
  additionalFeatures(tasks);
}

if (tasks.length === undefined || tasks.length === 0) {
  displayTasks(instructions);
} else displayTasks(tasks);
crudFunctionality();
