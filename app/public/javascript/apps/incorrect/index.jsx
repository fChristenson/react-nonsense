'use strict';

import React  from 'react';
import Avatar from '../../components/avatar/index.jsx';
import Button from '../../components/button/index.jsx';

const onClick = (props) => {
  return () => props.scoreboard(props.round, props.code);
};

export default (props) => {
  return (<div className="incorrect">
      <Avatar player={props.player.name} score={props.player.score} color={props.player.color}/> 
      <h1 className="incorrect__header">Incorrect</h1>
      <Button text={'Next round'} onClick={onClick(props)}/>
      </div>);
};
