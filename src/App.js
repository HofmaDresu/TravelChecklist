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
    const travelOptions = this.state.questionData.map(qd => (
      <div>
        <label>{qd.title}</label>
      </div>
    ));
    return (
      <div className="App">
        <div className="app-content">
          <div className="data-container">
            <h3>Travel Options</h3>
            {travelOptions}
          </div>
          <div className="data-container">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
