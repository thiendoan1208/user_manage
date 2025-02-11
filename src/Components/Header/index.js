import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import images from '~/assets/images';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '~/Context/UserContext';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Header() {
  const { logout, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/');
    toast.success('Logout success !');
  };

  return (
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <div className="flex items-center">
            <img src={images.HeaderLogo} alt="Logo" className="w-10" />
            {user && user.email ? (
              <span className="nav-link opacity-50">
                Welcome back <span className="font-semibold hidden sm:inline-block">{user.email}</span>!
              </span>
            ) : (
              <span>User Manage</span>
            )}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth === true) || window.location.pathname === '/' ? (
            <Nav className="me-auto">
              <NavLink className={({ isActive }) => cx('nav-link', { active: isActive })} to="/">
                Home
              </NavLink>
              <NavLink className={({ isActive }) => cx('nav-link', { active: isActive })} to="/users">
                Manage Users
              </NavLink>
            </Nav>
          ) : (
            <span></span>
          )}
          <Nav className="ml-auto">
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Support</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
              <NavDropdown.Divider />

              {user && user.auth === true ? (
                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
              ) : (
                <NavLink
                  className=" display: block w-full py-1 px-3 hover:bg-gray-50 text-black text-decoration-none"
                  to="/login"
                >
                  <span>Login</span>
                </NavLink>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
