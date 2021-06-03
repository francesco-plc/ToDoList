/* eslint-disable */

import {
  Button, Modal, Form, Col,
} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import Task from '../models/Task';

dayjs.extend(isSameOrBefore).extend(isSameOrAfter);

function TaskModal(props) {
  const {
    task, modalShow, setModalShow, addOrEditTask,
  } = props;
  const [description, setDescription] = useState(task ? task.description : '');
  const [deadline, setDeadline] = useState(task ? task.deadline : '');
  const [isImportant, setIsImportant] = useState(task ? task.important : false);
  const [isPrivate, setIsPrivate] = useState(task ? task.private : false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [invalidDeadline, setInvalidDeadline] = useState(false);
  const now = dayjs();


  const handleClose = () => {
    setModalShow(false);
    setDescription(task ? task.description : '');
    setDeadline(task ? task.deadline : '');
    setIsImportant(task ? task.important : false);
    setIsPrivate(task ? task.private : false);
    setInvalidDescription(false);
    setInvalidDeadline(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const invalidDate  = task ? false : (event.target.value !== '' && dayjs(event.target.value).isBefore(now, 'minute'));
    if (description === '' || invalidDate ) {
      setInvalidDescription(description === '');
      setInvalidDeadline(invalidDate);
      // eslint-disable-next-line no-alert
      alert('Please fill in required fields before saving ToDo.');
    } else {
      setModalShow(false);
      const id = task ? task.id : dayjs().unix();
      addOrEditTask(new Task(
        id,
        task ? task.user : 0,
        task ? task.completed : 0,
        description,
        isImportant,
        isPrivate,
        deadline,
      ));
    }
  };

  const handleChange = (event) => {
    if (event.target.id === 'taskDescription') {
      setDescription(event.target.value);
      setInvalidDescription(event.target.value === '');
    } else if (event.target.id === 'taskDeadline') {
      const invalidDate  = task ? false : (event.target.value !== '' && dayjs(event.target.value).isBefore(now, 'minute'));
      setDeadline(event.target.value);
      setInvalidDeadline(invalidDate);
    } else if (event.target.id === 'taskIsImportant') {
      setIsImportant(event.target.checked);
    } else if (event.target.id === 'taskIsPrivate') {
      setIsPrivate(event.target.checked);
    }
  };

  return (
    <Modal
      animation={false}
      show={modalShow}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {task ? 'Edit ToDo' : 'Add ToDo' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control isInvalid={invalidDescription} type="text" placeholder="Description" value={description} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Description must be provided.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="taskDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control isInvalid={invalidDeadline} type="datetime-local" placeholder="Deadline" value={deadline} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Deadline must be provided and later than the current date.</Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} lg={{ span: 6 }} controlId="taskIsImportant">
              <Form.Check type="switch" label="Set as important" checked={isImportant} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} lg={{ span: 4, offset: 1 }} controlId="taskIsPrivate">
              <Form.Check type="switch" label="Set as private" checked={isPrivate} onChange={handleChange} />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>Close</Button>
        <Button type="submit" onClick={handleSubmit} variant="info">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModal;
