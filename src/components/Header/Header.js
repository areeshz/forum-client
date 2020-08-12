import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from './logo.png'

const authenticatedOptions = (
  <Fragment>
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

const navStyle = {
  backgroundColor: '#009DAF'
}

const logoStyle = {
  backgroundColor: 'white',
  marginRight: '10px',
  borderRadius: '5px'
}

const brandStyle = {
  display: 'flex',
  alignItems: 'center'
}

const Header = ({ user }) => (
  <Navbar style={navStyle} variant="dark" expand="md">
    <Navbar.Brand href="#">
      <div style={brandStyle}>
        <img src={logo} height='30' style={logoStyle}/>
        {'Let\'s Talk!'}
      </div>
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
