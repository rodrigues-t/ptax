import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// const NavItem = props => {
//     const pageURI = window.location.pathname+window.location.search    
//     const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
//     const aClassName = (props.disabled === true) ? "nav-link disabled" : "nav-link"
//     return(
//         <li className={liClassName}>
//             <a className={aClassName} href={props.path}>
//                 {props.name}
//             </a>
//             {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
//         </li>
//     );
// }

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
                        {/* <NavItem name="Cotação por dia" path="/dia" />
                        <NavItem name="Cotação por período" path="/periodo" />
                        <NavItem name="Moedas" path="/moedas" />
                        <NavItem name="Informações" path="/info" />                         */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;