import { Collapse, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FilterMenu(props) {
  const {
    id, navbarMenu, showSidebar, setShowSidebar, filter, setFilter,
  } = props;

  return (
    <Collapse
      id={id}
      in={showSidebar}
      className={navbarMenu ? 'width-100 d-sm-none' : 'mt-3 d-none d-sm-block'}
    >
      <ListGroup variant="flush" key={filter || 'All'} defaultActiveKey={filter || 'All'}>
        <Link to="/All">
          <ListGroup.Item action eventKey="All" variant="info" onClick={() => { setShowSidebar(false); setFilter('All'); }}>All</ListGroup.Item>
        </Link>
        <Link to="/Important">
          <ListGroup.Item action eventKey="Important" variant="info" onClick={() => { setShowSidebar(false); setFilter('Important'); }}>Important</ListGroup.Item>
        </Link>
        <Link to="/Today">
          <ListGroup.Item action eventKey="Today" variant="info" onClick={() => { setShowSidebar(false); setFilter('Today'); }}>Today</ListGroup.Item>
        </Link>
        <Link to="/Next7Days">
          <ListGroup.Item action eventKey="Next7Days" variant="info" onClick={() => { setShowSidebar(false); setFilter('Next7Days'); }}>Next 7 Days</ListGroup.Item>
        </Link>
        <Link to="/Private">
          <ListGroup.Item action eventKey="Private" variant="info" onClick={() => { setShowSidebar(false); setFilter('Private'); }}>Private</ListGroup.Item>
        </Link>
      </ListGroup>
    </Collapse>
  );
}

export default FilterMenu;
