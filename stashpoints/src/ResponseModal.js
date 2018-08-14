import React, { Component } from 'react';
import './ResponseModal.css';

class ResponseModal extends Component {

  render() {
    return (
      <div
        className = {this.props.show ? "modal__show" : "modal__hide"}>
        <div className = "modal-content flex-centre-container">
          <div>
            <p>{this.props.data}</p>
          </div>
        </div>
      </div>
  )}
}

export default ResponseModal;
