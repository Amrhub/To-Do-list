/* eslint-disable no-var */
import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import displayTasks from './index.js';

var updateTask = () => {};
var removeTask = () => {};
var removeCheckedTasks = () => {};
var tasks = JSON.parse(localStorage.getItem('tasks'));

export default function crudFunctionality() {
  const addTaskForm = document.querySelector('.add-task-form');
  tasks = JSON.parse(localStorage.getItem('tasks'));

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks(updatedTasks);
  };

  const addTask = (e) => {
    e.preventDefault();
    const taskDescription = e.target.querySelector('.new-task').value;
    if (taskDescription.length) {
      const newTaskObject = {
        description: taskDescription,
        completed: false,
        index: tasks.length + 1,
      };
      tasks = _.concat(tasks, newTaskObject);
      updateLocalStorage(tasks);
      e.target.querySelector('.new-task').value = '';
    }
  };

  updateTask = (e, index) => {
    tasks[index].description = e.target.value;
    updateLocalStorage(tasks);
  };
  removeTask = (index) => {
    const newTasks = tasks.filter((t) => t.index !== parseInt(index, 10));
    tasks = newTasks;
    updateLocalStorage(newTasks);
    displayTasks(newTasks);
  };

  removeCheckedTasks = (tasks) => {
    tasks = _.filter(tasks, (task) => !task.completed);
    updateLocalStorage(tasks);
  };

  // Set event listeners

  addTaskForm.onsubmit = (e) => {
    addTask(e);
  };
}

export const setEventListeners = () => {
  _.forEach(document.querySelector('.todo-tasks').children, (task, index) => {
    const editTaskDescription = task.querySelector('.edit-task');
    const deleteIcon = task.querySelector('.task-icon:last-of-type');
    editTaskDescription.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateTask(e, index);
      }
    });
    deleteIcon.addEventListener('click', () => {
      removeTask(deleteIcon.id);
    });
  });

  const clearCompleted = document.querySelector('.clear-completed');
  clearCompleted.addEventListener('click', () => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    removeCheckedTasks(tasks);
  });
};

setEventListeners();
