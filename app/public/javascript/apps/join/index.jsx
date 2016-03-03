'use strict';

import React  from 'react';
import Button from '../../components/button/index.jsx';
import styles from './join.scss';

const onChange = (props) => {
  return (event) => {
    return props.setCode(event.target.value);
  }; 
};

export default (props) => {
  return (<div className="join">
    <h1 className="join__header">Join game</h1>
    <input onChange={onChange(props)} value={props.code} type="text" className="join__input"/>
    <Button text={'Join game'} onClick={props.lobby}/>
  </div>);
};
