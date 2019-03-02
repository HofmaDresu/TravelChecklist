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
    const alwaysItems = this.state.questionData.find(qd => qd.type === "always")
      .checklistItems.map(item => (
        <div key={item}><input type="checkbox" id={item} /><label htmlFor={item}>{item}</label></div>
      ))

    return (
      <div className="App">
        <div className="app-content">
          <TravelOptions {...(this.state)} />
          <div className="data-container">
            <h3>Checklist</h3>
            {alwaysItems}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
