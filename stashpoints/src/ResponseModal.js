import React, { Component } from 'react';
import DataItem from './DataItem';
import {interpretRecord} from './helpers';
import './ResponseModal.css';

class ResponseModal extends Component {

  render() {
    return (
      <div
        className = {this.props.show ? "modal__show" : "modal__hide"}>
        <div className = "modal-content flex-centre-container">
          <div>
            <ul>
              {this.props.data
                .map (interpretRecord)
                .map ((record, idx) => {
                  return record.map ((field, idx) =>
                    <div className="flex-container" key={''+idx+field.key}>
                      <span className = "data_key"> {field.key} : </span>
                      <DataItem value={field.value} index={idx}/>
                    </div>
                  )
                })

              })}
            </ul>
          </div>
        </div>
      </div>
  )}
}

export default ResponseModal;
