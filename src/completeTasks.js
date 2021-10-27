import _ from 'lodash';

export default function completeTasks(tasks) {
  const checkBoxes = document.querySelectorAll('.checkbox');

  _.forEach(checkBoxes, (checkBox, index) => {
    checkBox.addEventListener('change', () => {
      tasks[index].completed = checkBox.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
}
