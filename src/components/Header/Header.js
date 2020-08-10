import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#account">My Account</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavDropdown title="Feed (Topics)" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#feed">All</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#feed/General">General</NavDropdown.Item>
      <NavDropdown.Item href="#feed/Sports">Sports</NavDropdown.Item>
      <NavDropdown.Item href="#feed/Advice">Advice</NavDropdown.Item>
      <NavDropdown.Item href="#feed/Pets">Pets</NavDropdown.Item>
      <NavDropdown.Item href="#feed/Movies%20TV">Movies / TV</NavDropdown.Item>
      <NavDropdown.Item href="#feed/Books">Books</NavDropdown.Item>
      <NavDropdown.Item href="#feed/Current%20Events">Current Events</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Forum Client
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
