/* eslint-disable */

import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useState } from 'react';
import FilterMenu from './FilterMenu';
import TasksTable from './TasksComponents';
import TaskModal from './TaskModal';

function MainContent(props) {
  const {tasks, setTasks, addTask, deleteTask, updateTask, showSidebar, setShowSidebar, filter, setFilter } = props;
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Container fluid>
        <Row className="vheight-100">
          <Col className="sideBar d-none d-sm-block" sm={4}>
            <FilterMenu id="left-sidebar" showSidebar={showSidebar} setShowSidebar={setShowSidebar} filter={filter} setFilter={setFilter} />
          </Col>
          <Col className="mainPage mt-3" sm={8}>
            <TasksTable tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} updateTask={updateTask} />
          </Col>
        </Row>
      </Container>
      <Button variant="danger" className="fixed-right-bottom" onClick={() => setModalShow(true)}>&#43;</Button>
      <TaskModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        addOrEditTask={addTask}
      />
    </>
  );
}

export default MainContent;
