import React, { Component } from 'react';
import classNames from 'classnames';
import {randomKey} from './helpers';
import './DataItem.css';

// these checkers assume that the input value is JSON.stringified
const isPrimitive = value =>
  !isObject(value) && !isArray(value)

const isObject = value =>
  typeof value === 'string' && value.startsWith('{')

const isArray = value =>
  typeof value === 'string' && value.startsWith('[')

// returns an array of objects {key, value}
const unpack = stringified => {
  const item = JSON.parse(stringified);
  if (Array.isArray(item))
    return item.map ((value, idx) => ({key: idx, value}))
  if (typeof item === 'object')
    return Object.keys(item).map (key => ({key, value : item[key]}))
  return [];
}

const oddOrEvenDataItemClass = num =>
  (num % 2) ? 'data-item__any--odd'
   : 'data-item__any--even' ;


class DataItem extends Component {

  render() {
    const item = (typeof this.props.value === 'object') ?
      JSON.stringify (this.props.value)
      : this.props.value ;
    const index = this.props.index;

    return (
      isPrimitive (item) ?
        <span className = {classNames (
          'data-item',
          oddOrEvenDataItemClass (index)
        )}>
          {this.props.value}
        </span>
        :
          <ul key={randomKey()} className = {classNames (
            'data-item',
            oddOrEvenDataItemClass (index),
            (isObject (item)) ? 'data-item__table' : '',
            (isArray (item)) ? 'data-item__list' : ''
          )}>

            {unpack (item)
              .map (row => <li key={randomKey()}>
                  <span className = {classNames (
                    'data-key',
                    oddOrEvenDataItemClass (index)
                  )}>
                   {row.key}: </span>
                  <DataItem value={row.value} />
                </li>
              )}
          </ul>
  )}
}

export default DataItem;
