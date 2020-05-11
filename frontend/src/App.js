import React, { Component } from 'react';
import Viewer from './Viewer.js';
import Splash from './Splash.js';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ThemeProvider, Switch as Switcher, CssBaseline } from '@material-ui/core';
import {lightTheme, darkTheme} from './CSS/themes.js'

// ALL CSS IMPORTS
import './CSS/App.css';
import './CSS/DragTable.css';
import './CSS/index.css';
import './CSS/Splash.css';

class App extends Component {
  constructor(props){
    super(props)
    const initial = localStorage.darkMode === undefined ? false : localStorage.darkMode 
    this.state={"dark": initial === 'true'};
  }

  onToggle = (e) => {
    this.setState({"dark": !this.state.dark})
    localStorage.setItem('darkMode', !this.state.dark);
  }
  render() {
    return(
      <ThemeProvider theme={this.state.dark === true ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="main">
      <Router>
        <Switch>
          <Route path="/:slug" component ={Viewer}/>
          <Route path="/" component ={Splash}/>    
        </Switch>
      </Router>
      </div>
      <footer>
      <div style={{"display": "inline-block"}}>Dark Mode </div> 
      <div style={{"display": "inline-block"}}>
        <Switcher checked={this.state.dark} onChange={this.onToggle}/>
      </div>
      </footer>
      </ThemeProvider>
      )
  }
}
export default App;
