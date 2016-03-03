'use strict';

import React  from 'react';
import Button from '../../components/button/index.jsx';
import styles from './invite.scss';

export default (props) => {
  return ( <div className="invite">
      <h1 className="invite__header">Invite players</h1>
        <h2>
            <div className="invite__codeheader">Invite code</div>
            <div className="invite__code">{props.inviteCode}</div>
        </h2>
      <Button text={'Start game'} onClick={props.startGame}/>
      </div>);
};
