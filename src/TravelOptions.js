import React, { Component } from 'react';

function getTravelOptionsInput(questionData) {
    switch(questionData.type) {
        case "number":
            return <input className="travel-options" type="number" />;
        case "single-option": {
            const options = questionData.options.map(opt => (
                <option id={opt.title} key={opt.title}>{opt.title}</option>
            ));
            return (
                <select className="travel-options">
                    {options}
                </select>
            );
        }
        case "multi-option": {
            const options = questionData.options.map(opt => (
                <div key={opt.title}><input type="checkbox" id={opt.title} /><label htmlFor={opt.title}>{opt.title}</label></div>
            ));
            return <span className="travel-options">{options}</span>
        }
        default:
            return null;
    }
}

export default class TravelOptions extends Component {
  render() {
    const travelOptions = this.props.questionData.map(qd => {
        const options = getTravelOptionsInput(qd);
        
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
