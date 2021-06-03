import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isBetween).extend(isYesterday).extend(isToday).extend(isTomorrow);

class Task {
  constructor(id, user, completed, description, important = false, priv = true, deadline) {
    this.id = id;
    this.user = user;
    this.completed = completed;
    this.description = description;
    this.important = important;
    this.private = priv;
    this.deadline = deadline;
  }

  static from(json) {
    const task = new Task();
    Object.assign(task, json);
    return task;
  }

  hasProperty(property) {
    const today = dayjs();
    const deadline = dayjs(this.deadline);

    if (property === 'all') return true;
    if (property === 'important') return this.important;
    if (property === 'today') return deadline.isToday();
    if (property === 'seven') {
      return deadline.isBetween(today, today.add(6, 'd'), 'd', '[]');
    }
    if (property === 'private') return this.private;
    return false;
  }

  getFormattedDeadline() {
    const deadline = dayjs(this.deadline);

    if (!deadline.isValid()) return '';
    if (deadline.isYesterday()) return deadline.format('[Yesterday at] hh:mm A');
    if (deadline.isToday()) return deadline.format('[Today at] hh:mm A');
    if (deadline.isTomorrow()) return deadline.format('[Tomorrow at] hh:mm A');
    return deadline.format('MMM DD, YYYY hh:mm A');
  }
}

export default Task;
