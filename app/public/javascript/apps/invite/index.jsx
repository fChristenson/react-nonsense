'use strict';

import React  from 'react';
import Button from '../../components/button/index.jsx';
import Header from '../../components/header/index.jsx';

export default (props) => {
  return (<Header textTop={'Invite players'}>
      <div className="invite">
      <h2 className="invite__header">Invite code</h2>
      <h2 className="invite__code">{props.inviteCode}</h2>
      <Button text={'Start game'} onClick={props.startGame}/>
      </div>
      </Header>
      );
};
