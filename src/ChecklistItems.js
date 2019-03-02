import React, { Component } from "react";

function itemToChecklistItem(item) {
  return item ? (
    <div key={item}>
      <input type="checkbox" id={item} />
      <label htmlFor={item}>{item}</label>
    </div>
  ) : null;
}

class ChecklistItems extends Component {
  render() {
    let checklistItems = [];

    const singleOptionQD = this.props.questionData
      .filter(qd => qd.type=== "single-option")

    const singleOptionItems = singleOptionQD
      .flatMap(qd => (qd.options.find(opt => opt.title === this.props.answerData[qd.title]) || {}).checklistItems)
      .map(itemToChecklistItem);
        
        
        
        // (qd.options.find(qd => this.props.answerData[qd.title]) || {})["options"]);

    const alwaysItems = this.props.questionData
      .find(qd => qd.type === "always")
      .checklistItems.map(item => {
        const nightsGone = this.props.answerData["How many nights are you gone?"];

        if(!nightsGone && item.includes("nights")) return null;

        item = item
          .replace(
            "{nights}",
            Math.max(1, nightsGone)
          )
          .replace(
            "{reusable-clothes-nights}",
            Math.floor(nightsGone / 3 + 1)
          );

        return itemToChecklistItem(item);
      });

    checklistItems = checklistItems.concat(singleOptionItems).concat(alwaysItems).filter(item => item);
    return (
      <div className="data-container">
        <h3>Checklist</h3>
        {checklistItems}
      </div>
    );
  }
}

export default ChecklistItems;
