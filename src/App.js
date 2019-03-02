import React, { Component } from "react";
import TravelOptions from "./TravelOptions";
import ChecklistItems from "./ChecklistItems";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const questionData = require("./data.json");
    const answerDataNumberFields = questionData.filter(qd => qd.type === "number");

    const state = {
      questionData,
      answerData: {}
    };

    answerDataNumberFields.forEach(nf => 
      state.answerData[nf.title] = 0
    );

    this.state = state;

    this.handleUpdateNumber = this.handleUpdateNumber.bind(this);
  }
  handleUpdateNumber(fieldName, number) {
    this.setState((oldState) => ({
      answerData: Object.assign({}, oldState, { [fieldName]: number})
    }));
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
