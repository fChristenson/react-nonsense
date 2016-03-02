'use strict';

import React   from 'react';
import Avatar  from '../../components/avatar/index.jsx';
import Header  from '../../components/header/index.jsx';
import Spinner from '../../components/spinner/index.jsx';

export default (props) => {
  return (<div className="lobby">
      <Avatar player={props.player}/>
      <Header textTop={'Waiting for game'} textBottom={'to start'}>
      <Spinner/>
      </Header>
      </div>);
};

