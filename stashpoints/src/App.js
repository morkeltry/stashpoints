
import React, { Component } from 'react';
import Form from './Form';
import ResponseModal from './ResponseModal';
import {interpretResponse} from './helpers'
import './App.css';

const getUrl = 'https://api-staging.stasher.com/v1/stashpoints';

class App extends Component {
  constructor () {
    super ();
    this.state = {
      hasActiveResponse : false
    }
  };

  asyncSetters = {
    // onSuccess : result => {console.log(result); this.setState ({data : interpretResponse(result)})},
    onPostRequestFail : err => {console.log (err); this.setState ({message : 'Something went wrong. Please try again in '+Math.floor(Math.random()*10)+ ' minutes'})}
  }

  clearResponse = () => {
    this.setState ({hasActiveResponse : false})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header header-blur">
          <h1 className="App-title">I'm a form, yo!</h1>
        </header>

        <Form
          action = {'get'}
          asyncSetters = {this.asyncSetters}
        />

         <ResponseModal
           show = {this.state.hasActiveResponse}
           OnClickAway = {this.clearResponse}
         />

      </div>
    );
  }
}

export default App;
