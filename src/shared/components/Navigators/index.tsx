import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top" expand="lg">
                <Navbar.Brand>PTAX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer exact to="/">
                            <Nav.Link>Início</Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/dia">
                            <Nav.Link>Cotação por dia</Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/periodo">
                            <Nav.Link>Cotação por período</Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/moedas">
                            <Nav.Link>Moeda</Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/info">
                            <Nav.Link>Informações</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;