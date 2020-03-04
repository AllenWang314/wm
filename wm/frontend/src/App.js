import React, { Component } from 'react';
import Viewer from './Viewer.js';
import Splash from './Splash.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/:slug" component ={Viewer}/>
          <Route path="/" component ={Splash}/>    
        </Switch>
      </Router>
      )
  }
}
export default App;
