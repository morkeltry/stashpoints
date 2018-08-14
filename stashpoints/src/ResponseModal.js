import React, { Component } from 'react';
import './ResponseModal.css';

class ResponseModal extends Component {

  render() {
    console.log(this.props.show);
    return (
      <div
        className = {this.props.show ? "modal__show" : "modal__hide"}>
        <div className = "modal-content flex-centre-container">
          <div>
            <p>Response message</p>
          </div>
        </div>
      </div>
  )}
}

export default ResponseModal;
