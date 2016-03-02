'use strict';

import React  from 'react';
import Header from '../../components/header/index.jsx';
import Button from '../../components/button/index.jsx';

const onChange = (props) => {
  return (event) => {
    return props.setInviteCode(event.target.value);
  }; 
};

export default (props) => {
  return (<Header textTop={'Join game'}>
      <input onChange={onChange(props)} value={props.inviteCode} type="text" className="input"/>
      <Button text={'Join game'} onClick={props.lobby}/>
      </Header>);
};
