import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';

import {Link , Route, Switch , BrowserRouter as Router, Redirect } from 'react-router-dom';

import  Login from './Components/auth/login/Login'
import Home from './Components/Home/Home';
import Logout from './Components/auth/logout/Logout'

class App extends Component {

  constructor(props) {
    super(props)
    let loggedIn = false;
    this.state = {
        message: "parent message",
        loggedIn: loggedIn
    }
  }
  callbackFunction = (loggedIn) => {
    this.setState({loggedIn: loggedIn})
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    )
  }
}


export default App;
