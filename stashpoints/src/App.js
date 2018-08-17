
import React, { Component } from 'react';
import {Form, getUrl} from './Form';
import {interpretResponse} from './helpers'
import './App.css';

class App extends Component {
  constructor () {
    super ();
    this.state = {
      hasActiveResponse : false
    }
  };

  clearResponse = () => {
    this.setState ({hasActiveResponse : false})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header header-blur">
          <h1 className="App-title">Stash 'em'!</h1>
        </header>

        <Form
          action = {'get'}
          // asyncSetters = {this.asyncSetters}
        />

      </div>
    );
  }
}

export default App;
