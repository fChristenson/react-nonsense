'use strict';

import React  from 'react';
import Button from '../../components/button/index.jsx';

const onChange = (props) => {
  return (event) => {
    const val = parseInt(event.target.value);
    return props.setCode(val || '');
  }; 
};

const onClick = (props) => {
  return () => props.lobby(props.code)
};

export default (props) => {
  return (<div className="join">
    <h1 className="join__header">Join game</h1>
    <input onChange={onChange(props)} value={props.code} type="text" className="join__input"/>
    <Button text={'Join game'} onClick={onClick(props)}/>
  </div>);
};
