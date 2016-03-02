'use strict';

import React  from 'react';
import Avatar from '../../components/avatar/index.jsx';
import Header from '../../components/header/index.jsx';

export default (props) => {
  return (<div className="talker">
      <Avatar player={props.player} score={props.score}/>
      <Header textTop={'Use the letters'} textBottom={'to describe the image'}>
      <img src={props.image}/>
      <Header textTop={'Guesser'} textBottom={'guessed'}>
      <img src={props.selectedImage}/>
      </Header>
      </Header>
      </div>);
};

