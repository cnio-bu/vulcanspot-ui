import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
        <Route path="/treatments" component={Dashboard}/>
    );
  }
}

export default App;
