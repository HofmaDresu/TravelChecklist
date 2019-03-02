import React, { Component } from "react";

function getTravelOptionsInput(questionDatum, answerDatum, onUpdateNumber) {
  switch (questionDatum.type) {
    case "number":
      return (
        <input
          className="travel-options"
          type="number"
          value={answerDatum}
          onChange={e => onUpdateNumber(questionDatum.title, e.target.value)}
        />
      );
    case "single-option": {
      const options = questionDatum.options.map(opt => (
        <option id={opt.title} key={opt.title}>
          {opt.title}
        </option>
      ));
      return <select className="travel-options">{options}</select>;
    }
    case "multi-option": {
      const options = questionDatum.options.map(opt => (
        <div key={opt.title}>
          <input type="checkbox" id={opt.title} />
          <label htmlFor={opt.title}>{opt.title}</label>
        </div>
      ));
      return <span className="travel-options">{options}</span>;
    }
    default:
      return null;
  }
}

export default class TravelOptions extends Component {
  render() {
    const travelOptions = this.props.questionData.map(qd => {
      const matchingAnswerDatum = this.props.answerData[qd.title];
      const options = getTravelOptionsInput(qd, matchingAnswerDatum, this.props.onUpdateNumber);

      return (
        <div key={qd.title}>
          <h5>{qd.title}</h5>
          {options}
        </div>
      );
    });
    return (
      <div className="data-container">
        <h3>Travel Options</h3>
        {travelOptions}
      </div>
    );
  }
}
