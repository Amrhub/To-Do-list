import _ from 'lodash';

export default function completeTasks() {
  // eslint-disable-next-line no-var
  var tasks = [];
  setTimeout(() => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
  }, 620);
  setTimeout(() => {
    const checkBoxes = document.querySelectorAll('.checkbox');
    _.forEach(checkBoxes, (checkBox, index) => {
      checkBox.addEventListener('change', () => {
        tasks[index].completed = checkBox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
    });
  }, 620);
}
