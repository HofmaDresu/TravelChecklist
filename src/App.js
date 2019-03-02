import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const questionData = require('./data.json');

    this.state = {
      questionData
    }
  }
  render() {
    return (
      <div className="App">
        <div className="app-content">
          <div className="data-container">
          </div>
          <div className="data-container">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
