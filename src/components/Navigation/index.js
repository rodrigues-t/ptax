import React from 'react';

const NavItem = props => {
    const pageURI = window.location.pathname+window.location.search    
    const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
    const aClassName = (props.disabled === true) ? "nav-link disabled" : "nav-link"
    return(
        <li className={liClassName}>
            <a className={aClassName} href={props.path}>
                {props.name}
            </a>
            {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
        </li>
    );
}

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavItem name="Início" path="/" />
                        <NavItem name="Cotação por dia" path="/dia" />
                        <NavItem name="Cotação por período" path="/periodo" />
                        <NavItem name="Moedas" path="/moedas" />
                        <NavItem name="Informações" path="/info" />                        
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navigation;