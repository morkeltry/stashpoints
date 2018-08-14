import React, { Component } from 'react';
import './MessageBar.css';

class MessageBar extends Component {


  render() {
    return (
      <div
        className={this.props.message ? "messagebar__div__show" : "messagebar__div__hide"}
      >
        {Array.isArray(this.props.message) ?
          this.props.message.map ( (msg,idx) =>
            <div key={idx}>{msg}</div>
          ) :
          <div className="messagebar__message">{this.props.message}</div>
        }
      </div>
  )}
}

export default MessageBar;
