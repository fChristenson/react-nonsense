'use strict';

import React  from 'react';
import Avatar from '../../components/avatar/index.jsx';
import Button from '../../components/button/index.jsx';

export default (props) => {
  return (<div className="correct">
      <Avatar player={props.player.name} score={props.player.score} color={props.player.color}/> 
      <h1 className="correct__header">Correct</h1>
      <Button text={'Next round'} onClick={props.scoreboard}/>
      </div>);
};
