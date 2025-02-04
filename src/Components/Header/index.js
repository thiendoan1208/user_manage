import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import images from '~/assets/images';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <div className="flex items-center">
            <img src={images.HeaderLogo} alt="Logo" className="w-10" />
            <span>User Manage</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={({ isActive }) => cx('nav-link', { active: isActive })} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => cx('nav-link', { active: isActive })} to="/users">
              Manage Users
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Support</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
