'use strict';

import React  from 'react';
import Button from '../../components/button/index.jsx';

export default (props) => {
  return (<div className="startscreen">
      <h1 className="startscreen__header">Nonsenses</h1>
      <Button text={'Invite to game'} onClick={props.inviteToGame}/>
      <Button text={'Join game'} onClick={props.joinGame}/>
      </div>);
};
