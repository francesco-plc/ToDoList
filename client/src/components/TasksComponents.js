/* eslint-disable */
import {
  Button, FormCheck, Table, ButtonGroup,
} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import TaskModal from './TaskModal';
import { iconDelete, iconEdit, iconPrivate } from './Icons';
import useQuery from './Query';
import Task from '../models/Task';

dayjs.extend(isBetween);

function TasksTable(props) {
  const { tasks, setTasks, deleteTask, updateTask } = props;

  /* const { filter } = useParams(); */
  const query = useQuery();
  const filter = query.get('filter');

  const filterTask = (task) => {
    const today = dayjs();
    if (!filter || filter === 'all') return true;
    if (filter === 'important') return task.important;
    if (filter === 'today') return task.deadline.isSame(today, 'd');
    if (filter === 'seven') {
      return task.deadline.isValid()
      && task.deadline.isBetween(today, today.add(6, 'd'), 'd', '[]');
    }
    if (filter === 'private') return task.private;
    return false;
  };
  return (
    <Table id="task-table" variant="light">
      <tbody>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </tbody>
    </Table>
  );
}

function TaskRow(props) {
  const { task, deleteTask, updateTask } = props;
  return (
    <tr>
      <TaskRowData task={task} updateTask={updateTask}/>
      <TaskRowControls task={task} updateTask={updateTask} deleteTask={deleteTask} />
    </tr>
  );
}

function TaskRowData(props) {
  const { task, updateTask } = props;
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleChange = (event) => {
    setIsCompleted(event.target.checked);
    const currTask = new Task(task.id, task.description, task.important, task.private, task.deadline, !isCompleted);

    updateTask(currTask)
  }

  return (
    <>
      <td className="text-left align-middle border-bottom">
        <FormCheck>
          <FormCheck.Input type="checkbox" id={`check-t${task.id}`} checked={isCompleted} onChange={handleChange} />
          <FormCheck.Label className={task.important ? 'important' : ''} htmlFor={`check-t${task.id}`}>
            {task.description}
          </FormCheck.Label>
        </FormCheck>
      </td>
      <td className="text-center align-middle border-bottom">
        {task.private ? iconPrivate : ''}
      </td>
      <td className="text-right align-middle border-bottom">
        <small>{task.getFormattedDeadline()}</small>
      </td>
    </>
  );
}

function TaskRowControls(props) {
  const { task, deleteTask, updateTask } = props;
  const [modalShow, setModalShow] = useState(false);
  return (
    <td className="text-center align-middle border-bottom">
      <ButtonGroup>
        <Button size="sm" variant="outline-light" onClick={() => setModalShow(true)}>
          {iconEdit}
        </Button>
        <Button size="sm" variant="outline-light" onClick={() => deleteTask(task.id)}>
          {iconDelete}
        </Button>
      </ButtonGroup>
      <TaskModal
        task={task}
        modalShow={modalShow}
        setModalShow={setModalShow}
        addOrEditTask={updateTask}
      />
    </td>
  );
}

export default TasksTable;
