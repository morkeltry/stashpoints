import React, { Component } from 'react';
import {interpretResponse} from './helpers';
import './Submit.css';

const headers = {
    'Content-Type': 'multipart/form-data',     //Uncomment to DECLARE as multipart (which doesn't mean that it really is multipart! - It's probably still JSON)
    // 'Content-Type': 'application/json',         //Uncomment to provide JSON string
    'Accept': 'text/html'
}


class Submit extends Component {

  //functionality incomplete - commenting out preventDefault() allows form submission by default behaviour
  //ie browser will attempt to load url and display it in address bar
  submitHandler = (ev, url, setters)=> {
    ev.preventDefault();
    fetch (url, {headers: headers})
      .then (response => {
        console.log('body:',response.body);
          return response.json();

      })
      .then (this.setter || setters.onSuccess)
      .catch (setters.onPostRequestFail)
  }

  render() {
    let clickable=this.props.clickable()
    return (
      <input
        type = "submit"
        value = {this.props.title}
        className = {clickable ? "submit-button clickable" : "submit-button"}
        onClick = {
          clickable ?
            (ev) => {this.submitHandler (ev, this.props.action+this.props.query, this.props.setters)} :
            this.props.nag
        }>
      </input>
  )}
}

export default Submit;
