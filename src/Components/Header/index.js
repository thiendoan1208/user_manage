import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import images from '~/assets/images';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logout success !');
  };

  return (
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
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
              <NavLink
                className=" display: block w-full py-1 px-3 hover:bg-gray-50 text-black text-decoration-none"
                to="/login"
              >
                <span>Login</span>
              </NavLink>
              <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
