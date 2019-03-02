import React, { Component } from "react";

class ChecklistItems extends Component {
  render() {
    let checklistItems = [];
    const alwaysItems = this.props.questionData
      .find(qd => qd.type === "always")
      .checklistItems.map(item => {
        item = item
          .replace(
            "{nights}",
            Math.max(1, this.props["How many nights are you gone?"])
          )
          .replace(
            "{reusable-clothes-nights}",
            Math.floor(this.props["How many nights are you gone?"] / 3 + 1)
          );

        return (
          <div key={item}>
            <input type="checkbox" id={item} />
            <label htmlFor={item}>{item}</label>
          </div>
        );
      });

    checklistItems = checklistItems.concat(alwaysItems);
    return (
      <div className="data-container">
        <h3>Checklist</h3>
        {checklistItems}
      </div>
    );
  }
}

export default ChecklistItems;
