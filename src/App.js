import React, { Component } from 'react';
import TravelOptions from './TravelOptions';
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
          <TravelOptions {...(this.state)} />
          <div className="data-container">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
