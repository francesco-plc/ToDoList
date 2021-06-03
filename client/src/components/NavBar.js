import { Navbar, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { iconLogo, iconUser } from './Icons';
import FilterMenu from './FilterMenu';

function NavBar(props) {
  const { loggedIn, showSidebar, setShowSidebar } = props;
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  /* if (submitted) {
    return (
      <Redirect push to={`/?search=${search}`} />);
  } */

  return (
    <Navbar collapseOnSelect className="NavBar" expand="sm" variant="light" fixed="top">

      {/* Left Sidebar Toggler */}
      {loggedIn ? (
        <Navbar.Toggle
          aria-controls="left-sidebar"
          onClick={() => setShowSidebar((currValue) => !currValue)}
        />
      ) : (<Navbar.Toggle className="disabled" />)}

      {/* NavBar Logo & Title */}
      <Link to="/">
        <Navbar.Brand>
          {iconLogo}
          {' '}
          ToDo Manager
        </Navbar.Brand>
      </Link>

      {/* Search Bar */}
      <Form id="searchBar" inline className="mx-auto d-none d-sm-block" onSubmit={handleSubmit}>
        <Form.Control type="search" placeholder="Search" aria-label="Quick search" onChange={handleChange} />
      </Form>

      {/* Account Button */}
      <NavLink to="/Account" className="text-info">{iconUser}</NavLink>

      {/* Navbar Menu */}
      {loggedIn ? (<FilterMenu navbarMenu id="navbar-menu" showSidebar={showSidebar} setShowSidebar={setShowSidebar} />) : ''}

    </Navbar>
  );
}

export default NavBar;
