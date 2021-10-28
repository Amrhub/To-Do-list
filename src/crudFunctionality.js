import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import displayTasks from './index.js';
import completeTasks from './completeTasks.js';

export default function crudFunctionality(tasks) {
  const addTaskForm = document.querySelector('.add-task-form');
  const clearCompleted = document.querySelector('.clear-completed');

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (e) => {
    const taskDescription = e.target.querySelector('.new-task').value;
    if (taskDescription.length) {
      const newTaskObject = {
        description: taskDescription,
        completed: false,
        index: tasks.length + 1,
      };
      tasks = _.concat(tasks, newTaskObject);
      updateLocalStorage(tasks);
      completeTasks(tasks);
    }
  };

  const updateTask = (e, index) => {
    tasks[index].description = e.target.value;
    updateLocalStorage(tasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((t) => t.index !== parseInt(index, 10));
    updateLocalStorage(newTasks);
    window.location.reload();
  };

  const removeCheckedTasks = () => {
    tasks = _.filter(tasks, (task) => !task.completed);
    updateLocalStorage(tasks);
    displayTasks(tasks);
  };

  // Set event listeners

  addTaskForm.onsubmit = (e) => {
    addTask(e);
  };

  clearCompleted.addEventListener('click', () => {
    removeCheckedTasks();
  });

  const setEventListeners = () => {
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
  };

  setEventListeners();
}
