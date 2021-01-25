import React, { Component } from 'react';

import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigator from './shared/components/Navigator';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import RatePerDay from './pages/RatePerDay';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoins, faCalendarAlt, faSpinner, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap';

library.add(faCoins, faCalendarAlt, faSpinner, faArrowRight);

class App extends Component {
  render() {
    return (
      <>
        <Navigator />
        <Container className="mt-2">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dia" component={RatePerDay} />
          </Switch>
        </Container>
      </>
    );
  }
}

export default App;
