'use strict';

import React  from 'react';
import Button from '../../components/button/index.jsx';
import Header from '../../components/header/index.jsx';

export default (props) => {
  return (<Header textTop={'Nonsense'}>
        <div className="startscreen">
          <Button text={'Invite to game'} onClick={props.inviteToGame}/>
          <Button text={'Join game'} onClick={props.joinGame}/>
        </div>
      </Header>);
};
