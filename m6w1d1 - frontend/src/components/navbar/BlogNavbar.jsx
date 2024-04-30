import React from "react";
import { Button, Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PersonCircle } from 'react-bootstrap-icons';
import logo from "../../assets/logo.png";
import "./styles.css";
import { useAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const NavBar = props => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/" className="fs-3 fst-italic text-success fw-bold">
          <img className="blog-navbar-brand d-inline-block align-top" alt="logo" src={logo}/>
          {' '}EpiBlog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" activeclassname="active">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/authors" activeclassname="active">Authors</Nav.Link>
          </Nav>
          <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark me-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Nuovo Articolo
          </Button>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle" as="span">
              <span className="text-success fw-bold text-decoration-underline">{user.nome}</span>{' '}
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              ) : (
                <PersonCircle style={{color: "green"}} size={40} />
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              <Dropdown.Item as={Link} to="/profile">Il Mio Profilo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
