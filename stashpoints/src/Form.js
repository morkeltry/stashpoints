
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
      respData : '',
      formData : {},
      consent : false,    // no input to consent field shoudl not block submission;
    }
  };

  formFields = [
    ['latitude', 'centre_lat', 'centre_lat', 'signed decimal eg -0.1339 : use with nearby_radius (filtering) or by_distance (sorting)'],
    ['longitude', 'centre_lon', 'centre_lon', 'signed decimal eg -0.1339 : use with nearby_radius (filtering) or by_distance (sorting)'],

    ['assoc_id', 'assoc_id', 'assoc_id', 'id = 12-digit hex'],
    ['active', 'active', 'active', 'bool'],
    ['twentyfour_seven', 'twentyfour_seven', 'twentyfour_seven', 'bool'],
    ['open_late', 'open_late', 'open_late', 'bool'],
    ['featured', 'featured', 'featured', 'bool'],
    ['type', 'type', 'type', 'hotel, newsagent, postal, cafe, tourist_information_centre, internet_cafe, other'],
    ['city', 'city', 'city', 'string'],
    ['nearby_radius', 'nearby_radius', 'nearby_radius', 'float, NB latitude & longitude required'],
    ['min_capacity', 'min_capacity', 'min_capacity', 'integer'],
    ['open_at', 'open_at', 'open_at', '2017-08-23T12:00:00Z, comma-seperated'] ,

    ['by_distance', 'by_distance', 'by_distance', 'asc or desc'],
    ['by_capacity', 'by_capacity', 'by_capacity', 'asc or desc'],
    ['by_bags_last_30_days', 'by_bags_last_30_days', 'by_bags_last_30_days', 'asc or desc']
  ];

  hashOf = password => password;

  //Yes, It's hacky :(
  //An alternative would be to place values and erros objects in the state, but then .setState() wouldn't work as prettily.
  // Better would be refactoring so that errors are stored in App state, and the ValidationErrorMessage is also rendered from App.
  //  Oh, if only there were enough time!
  updateFormValue= (field, value)=> {
    const newState = this.state.formData;
    newState[field+'value'] = value;

  console.log('Will update Form state with this.setState using {formData :'+JSON.stringify(newState),'}');
    this.setState (newState);
  }

  asyncSetters = {
    onSuccess : result => {
      console.log(result);
      this.setState ({respData : interpretResponse(result)})
      this.setState ({hasActiveResponse : true})
    },

    onRequestFail : err =>
      {console.log (err);
      this.setState ({message : 'Something went wrong. Please try again in '+Math.floor(Math.random()*10)+ ' minutes'})
    }
  }

  bundleData = formData => {
    const dataObj = {};
    let dataQueryString = '';
console.log(formData);
    this.formFields.forEach (field => {
console.log('trying field',field);
      if (formData[field[1]+'value']) {
        console.log(formData[field[1]+'value']);
        dataObj[field[1]] = formData[field[1]+'value'];
        dataQueryString += "&"+field+formData[field[1]+'value'];

      }
    });
console.log('postable currently =',dataQueryString) //.replace('&','?'));
    return dataQueryString.replace('&','?');
    // return JSON.stringify(dataObj);
  }


  render() {
    //Quicky hacky way to have network message shown in error display, without refactoring it back up into App.js

    let asyncSetters = this.props.asyncSetters || this.asyncSetters;
    asyncSetters.onRequestFail = err => {
      console.log (err); this.setState ({message : "Something went wrong..."})}

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
          data = {this.bundleData(this.state.formData)}
          clickable = {()=>true}
          nag = {()=>{}}
          setters = {asyncSetters}
         />

       <MessageBar
         message = {JSON.stringify(this.state.respData)}
       />

        <ResponseModal
          show = {this.state.hasActiveResponse}
          OnClickAway = {this.clearResponse}
          data = {this.state.respData}
        />

       </form>
      </div>
    );
  }
}

export { Form, getUrl };
