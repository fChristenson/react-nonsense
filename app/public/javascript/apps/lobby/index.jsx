'use strict';

import React   from 'react';
import Avatar  from '../../components/avatar/index.jsx';
import Spinner from '../../components/spinner/index.jsx';

export default (props) => {
  return (<div className="lobby">
      <Avatar player={props.player}/>
      <h1 className="lobby__header">
          <div>Waiting for game</div>
          <div>to start</div>
      </h1>
      <Spinner/>
      </div>);
};

