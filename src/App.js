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

library.add(faCoins, faCalendarAlt, faSpinner, faArrowRight);

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Intro} />
            <Route exact path="/dia" component={PerDay} />
          </Switch>
        </div>
      </div>
      
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //     <span class="text-danger">teste</span>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
