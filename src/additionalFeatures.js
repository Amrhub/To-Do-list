import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import crudFunctionality from './crudFunctionality.js';
import completeTasks from './completeTasks.js';

const reloader = document.querySelector('.fa-sync');

export default function additionalFeatures(tasks) {
  reloader.addEventListener('click', () => {
    reloader.style.animation = 'loader 500ms ease-in-out 1';
    setTimeout(() => {
      reloader.style.animation = 'none';
    }, 600);
    setTimeout(() => {
      _.forEach(document.querySelectorAll('#test'), (list) => {
        list.remove();
      });
      _.forEach(document.querySelectorAll('.task'), (task, index) => {
        task.querySelector('.fa-trash-alt').id = index + 1;
      });
      tasks = _.filter(tasks, (task) => task.test !== true);
      _.forEach(tasks, (task, index) => {
        task.index = index + 1;
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      crudFunctionality();
    }, 600);
    completeTasks();
  });
}
