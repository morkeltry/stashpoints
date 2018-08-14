
import React, { Component } from 'react';
import InputLine from './InputLine';
import Submit from './Submit';
import MessageBar from './MessageBar';
import ResponseModal from './ResponseModal';
import {interpretResponse} from './helpers';

const getUrl = 'https://api-staging.stasher.com/v1/stashpoints';

class Form extends Component {
  constructor () {
    super ();
    //in state, true prevents submission, false reports no errors, message=error specifies the error
    this.state = {
      message : false,
      data : {},
      consent : false,    // no input to consent field shoudl not block submission;
    }
  };

  formFields = [
    ['Email: ',             'email',    'email',  'me@me.me']
  ];

  hashOf = password => password;

  updateState = (newState) => {
    this.setState (newState)
  };

  //Yes, It's hacky :(
  //An alternative would be to place values and erros objects in the state, but then .setState() wouldn't work as prettily.
  // Better would be refactoring so that errors are stored in App state, and the ValidationErrorMessage is also rendered from App.
  //  Oh, if only there were enough time!
  updateFormValue= (field, value)=> {
    const newState = {};
    newState[field+'value'] = value;
    this.setState (newState);
  }

  bundleData = state => {
    const dataObj = {};
    this.formFields.forEach (field => {
      dataObj[field[1]] = state[field[1]+'value'];
    });
  return JSON.stringify(dataObj);
  }


  render() {
    //Quicky hacky way to have network message shown in error display, without refactoring it back up into App.js
    let settersOverride = this.props.asyncSetters;
    settersOverride.onPostRequestFail = err => {
      console.log (err); this.updateState ({message : "Something went wrong..."})}

    return (
      <div>
      <form className="form-flex form-styled"  action={getUrl} method="get" encType="multipart/form-data">
        <p className="form-header"> FORMFORMFORM </p>

        {this.formFields.map (fieldContents => {
          const [title, name, type, placeholder, required] = fieldContents;
          return <InputLine
            title = {title}
            name = {name}
            key = {name}
            type = {type}
            placeholder = {placeholder}
            required = {!!required}
            updateErrors = {this.updateValidationErrorState}       // setters
            updateValues = {this.updateFormValue}
            errorState = {this.state[fieldContents[1]]}     //field name, store error as property named after it
        />})}

        <Submit
          title = 'Do Submit'
          action = {getUrl}
          data = {this.bundleData(this.state)}
          clickable = {()=>true}
          nag = {()=>{}}
          setters = {settersOverride}
         />

       <MessageBar
         message = {JSON.stringify(this.state.data)}
       />

       </form>
      </div>
    );
  }
}

export default Form;
