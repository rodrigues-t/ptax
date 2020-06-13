import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
//import Main from './components/Main';
import {Switch, Route} from 'react-router-dom';
import Intro from './components/Intro';
import PerDay from './components/PerDay';

import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faCalendarAlt, faSpinner, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap';

library.add(faCoins, faCalendarAlt, faSpinner, faArrowRight);

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Container fluid className="mt-2">
          <Switch>
            <Route exact path="/" component={Intro} />
            <Route exact path="/dia" component={PerDay} />
          </Switch>
        </Container>
      </>
    );
  }
}

export default App;
