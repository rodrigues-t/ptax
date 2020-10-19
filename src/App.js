import React, { Component } from 'react';

import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import QuotationPerDay from './pages/QuotationPerDay';

import { library } from '@fortawesome/fontawesome-svg-core'
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
            <Route exact path="/" component={Home} />
            <Route exact path="/dia" component={QuotationPerDay} />
          </Switch>
        </Container>
      </>
    );
  }
}

export default App;
