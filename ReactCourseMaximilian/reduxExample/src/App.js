import React, { Component } from 'react';

import Counter from './containers/Counter/Counter';
import './App.css';
import TestComponent from './containers/testComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
       <TestComponent />
      </div>
    );
  }
}

export default App;
