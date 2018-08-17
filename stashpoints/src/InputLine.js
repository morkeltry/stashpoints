import React, { Component } from 'react';
import './InputLine.css';

 // InputLine produces fieldname text and input elements left and right aligned to a vertical.
class InputLine extends Component {

  handleChange (event, updateErrors, updateFormValue) {
    const node = event.target;
    updateFormValue (node.name, node.value);
  }

  render() {
    return (
      <div className="flex-container">
        <label htmlFor={this.props.name} className="flex-child-left fieldname-text"> {this.props.title} </label>
          <input className="flex-child-right"
            id={this.props.name}
            type={this.props.type || 'text'}
            name={this.props.name}
            placeholder={this.props.placeholder || ''}
            noValidate
            onChange={
              event => {this.handleChange (event, this.props.updateErrors, this.props.updateValues)}
            }
          />
      </div>
  )}
}

export default InputLine;
