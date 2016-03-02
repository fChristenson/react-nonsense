'use strict';

import React       from 'react';
import Avatar      from '../../components/avatar/index.jsx';
import Header      from '../../components/header/index.jsx';
import LetterTable from '../../components/letterTable/index.jsx';
import TalkInput   from '../../components/talkInput/index.jsx';

export default (props) => {
  return (<div className="talker">
      <Avatar player={props.player} score={props.score}/>
      <Header textTop={'Use the letters'} textBottom={'to describe the image'}>
      <img src={props.image}/>
      <TalkInput letters={props.letters}/>
      <LetterTable onClick={props.addLetter} letters={props.randomLetters}/>
      </Header>
      </div>);
};

