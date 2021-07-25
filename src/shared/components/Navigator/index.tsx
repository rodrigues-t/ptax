import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './index.css';

const Navigation = () => {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top" expand="lg">
      <Navbar.Brand>PTAX</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Início</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Cotação" id="exchange-rate-dd">
            <LinkContainer exact to="/dia" activeClassName="active">
              <NavDropdown.Item>por dia</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer exact to="/periodo" activeClassName="active">
              <NavDropdown.Item>por período</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer exact to="/sobre">
            <Nav.Link disabled>Sobre</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
