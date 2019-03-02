import React, { Component } from "react";
import TravelOptions from "./TravelOptions";
import ChecklistItems from "./ChecklistItems";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const questionData = require("./data.json");

    this.state = {
      questionData
    };

    this.handleUpdateNumber = this.handleUpdateNumber.bind(this);
  }
  handleUpdateNumber(fieldName, number) {
    //todo: better state
    this.setState({
      [fieldName]: number
    });
  }
  render() {
    return (
      <div className="App">
        <div className="app-content">
          <TravelOptions
            {...this.state}
            onUpdateNumber={this.handleUpdateNumber}
          />
          <ChecklistItems {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
