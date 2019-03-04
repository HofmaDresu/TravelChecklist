import React, { Component } from "react";
import "./ChecklistItems.css";

function itemToChecklistItem(item, isChecked, onCheckedChanged) {
  return item ? (
    <div key={item}>
      <input type="checkbox" id={item} checked={isChecked} onChange={e => onCheckedChanged(item)} />
      <label htmlFor={item}>{item}</label>
    </div>
  ) : null;
}

class ChecklistItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: [],
    };

    this.handleCheckedChanged = this.handleCheckedChanged.bind(this);
  }
  handleCheckedChanged(item) {
    this.setState((oldState) => {
      const checkedItems = oldState.checkedItems || [];

      if(checkedItems.includes(item)) {
        checkedItems.splice(checkedItems.indexOf(item), 1)
      } else {
        checkedItems.push(item);
      }
      
      return {
        answerData: Object.assign({}, oldState, { checkedItems })
      };
    });
  }
  render() {
    let checklistItems = [];

    const singleOptionItems = this.props.questionData
      .filter(qd => qd.type=== "single-option")
      .flatMap(qd => (qd.options.find(opt => opt.title === this.props.answerData[qd.title]) || {}).checklistItems)
      .map(i => itemToChecklistItem(i, this.state.checkedItems.includes(i), this.handleCheckedChanged));

    const multiOptionItems = this.props.questionData
      .filter(qd => qd.type=== "multi-option")
      .flatMap(qd => (
        qd.options.filter(opt => (this.props.answerData[qd.title] || []).includes(opt.title)
          ) || {}).flatMap(opt => opt.checklistItems))
      .map(i => itemToChecklistItem(i, this.state.checkedItems.includes(i), this.handleCheckedChanged));

    const alwaysItems = this.props.questionData
      .find(qd => qd.type === "always")
      .checklistItems.map(item => {
        const nightsGone = this.props.answerData["How many nights are you gone?"];

        if(!nightsGone && (item || []).includes("nights")) return null;

        item = item
          .replace(
            "{nights}",
            Math.max(1, nightsGone)
          )
          .replace(
            "{reusable-clothes-nights}",
            Math.floor(nightsGone / 3 + 1)
          );

        return itemToChecklistItem(item, this.state.checkedItems.includes(item), this.handleCheckedChanged);
      });

    checklistItems = checklistItems.concat(singleOptionItems).concat(multiOptionItems).concat(alwaysItems).filter(item => item);
    checklistItems.sort((item1, item2) => {
      if (!this.state.checkedItems.includes(item1.key) && this.state.checkedItems.includes(item2.key)) {
        return -1;
      }
      if (this.state.checkedItems.includes(item1.key) && !this.state.checkedItems.includes(item2.key)) {
        return 1;
      }
      return 0;
    });
    return (
      <div className="data-container checklist">
        <h3>Checklist</h3>
        {checklistItems}
      </div>
    );
  }
}

export default ChecklistItems;
