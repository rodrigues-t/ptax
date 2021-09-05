import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import './assets/styles/main.scss';
import {
  faCoins,
  faCalendarAlt,
  faSpinner,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Switch, Route } from 'react-router-dom';
import Navigator from './shared/components/Navigator';
import Home from './pages/Home/Home';
import RatePerDay from './pages/RatePerDay/RatePerDay';
import RatePerPeriod from './pages/RatePerPeriod';

library.add(faCoins, faCalendarAlt, faSpinner, faArrowRight);

const App = () => (
  <>
    <Navigator />
    <Container className="mt-2">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dia" component={RatePerDay} />
        <Route exact path="/periodo" component={RatePerPeriod} />
      </Switch>
    </Container>
  </>
);

export default App;
