
import React, { Component } from 'react';
import InputLine from './InputLine';
import Submit from './Submit';
import MessageBar from './MessageBar';
import ResponseModal from './ResponseModal';
import {interpretResponse, formatResponse} from './helpers';
import { getUrl, encType } from './constants';

class Form extends Component {
  constructor () {
    super ();
    this.state = {
      message : false,
      respData : [],
      formData : {}
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

  updateFormValue= (field, value)=> {
    const newState = this.state.formData;
    newState[field+'value'] = value;

  console.log('Will update Form state with this.setState using {formData :'+JSON.stringify(newState),'}');
    this.setState (newState);
  }

// This is the correct place to define the behaviour of the Form once a reponse is received.
// It can be overridden by passing an asyncSetters object in props, or by overriding by child.
  asyncSetters = {
    onSuccess : result => {
      this.setState ({respData : interpretResponse(result, true)})
      this.setState ({hasActiveResponse : true})
    },

    onRequestFail : err =>
      {console.log (err);
      this.setState ({message : 'Something went wrong...'})
    }
  }

  // Create a query string based on current form state
  bundleData = formData => {
    const dataObj = {};
    let dataQueryString = '';
    this.formFields.forEach (field => {
      if (formData[field[1]+'value']) {
        console.log(formData[field[1]+'value']);
        dataObj[field[1]] = formData[field[1]+'value'];
        dataQueryString += `&${field[1]}=${formData[field[1]+'value']}`;
      }
    });
    return dataQueryString.replace('&','?');
    // return JSON.stringify(dataObj);
  }


  render() {
    let asyncSetters = this.props.asyncSetters || this.asyncSetters;

    return (
      <div>
      <form className="form-flex form-styled"  action={getUrl} method="get" encType="multipart/form-data">
        <p className="form-header"> Enter criteria </p>

        {this.formFields.map (fieldContents => {
          const [title, name, type, placeholder, required] = fieldContents;
          return <InputLine
            title = {title}
            name = {name}
            key = {name}
            type = {type}
            placeholder = {placeholder}
            required = {!!required}
            updateErrors = {()=>{}}                 // setters for specific error logging and validation functionality - unused here.
            updateValues = {this.updateFormValue}
            errorState = {this.state[fieldContents[1]]}     //field name, store error as property named after it
        />})}

        <Submit
          title = 'Find me stashpoints!'
          action = {getUrl}
          query = {this.bundleData(this.state.formData)}
          clickable = {()=>true}
          nag = {()=>{}}
          setters = {asyncSetters}
         />

         <MessageBar
           message = {this.state.message}
         />

        <ResponseModal
          show = {this.state.hasActiveResponse}
          OnClickAway = {this.clearResponse}
          data = {interpretResponse (this.state.respData)}
        />

       </form>
      </div>
    );
  }
}

export { Form, getUrl };
