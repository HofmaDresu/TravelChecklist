import React, { Component } from "react";
import TravelOptions from "./TravelOptions";
import ChecklistItems from "./ChecklistItems";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const questionData = require("./data.json");

    const state = {
      questionData,
      answerData: {}
    };

    questionData.forEach(qd => {
      switch(qd.type) {
        case "number":
          state.answerData[qd.title] = 0;
          break;
        case "single-option":
          state.answerData[qd.title] = '-- Select an option --';
          break;
        case "multi-option":
          state.answerData[qd.title] = [];
          break;
        default:
          break;
      }
    });

    this.state = state;

    this.handleUpdateNumber = this.handleUpdateNumber.bind(this);
    this.handleUpdateSingleOption = this.handleUpdateSingleOption.bind(this);
    this.handleUpdateMultiOption = this.handleUpdateMultiOption.bind(this);
  }
  handleUpdateNumber(fieldName, number) {
    this.setState((oldState) => ({
      answerData: Object.assign({}, oldState.answerData, { [fieldName]: Math.max(0, number)})
    }));
  }
  handleUpdateSingleOption(fieldName, selectionKey) {
    this.setState((oldState) => ({
      answerData: Object.assign({}, oldState.answerData, { [fieldName]: selectionKey})
    }));
  }
  handleUpdateMultiOption(fieldName, key) {
    this.setState((oldState) => {
      const selectedItems = oldState.answerData[fieldName] || [];

      if(selectedItems.includes(key)) {
        selectedItems.splice(selectedItems.indexOf(key), 1)
      } else {
        selectedItems.push(key);
      }
      
      return {
        answerData: Object.assign({}, oldState.answerData, { [fieldName]: selectedItems})
      };
    });
  }
  render() {
    return (
      <div className="App">
        <div className="app-content">
          <TravelOptions
            {...this.state}
            onUpdateNumber={this.handleUpdateNumber}
            onUpdateSingleOption={this.handleUpdateSingleOption}
            onUpdateMultiOption={this.handleUpdateMultiOption}
          />
          <ChecklistItems {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
