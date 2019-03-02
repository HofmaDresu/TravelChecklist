import React, { Component } from 'react';

export default class TravelOptions extends Component {
  render() {
    const travelOptions = this.props.questionData.map(qd => (
      <div>
        <label>{qd.title}</label>
      </div>
    ));
    return (
        <div className="data-container">
        <h3>Travel Options</h3>
        {travelOptions}
        </div>
    );
  }
}
