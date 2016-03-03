'use strict';

import React       from 'react';
import Avatar      from '../../components/avatar/index.jsx';
import LetterTable from '../../components/letterTable/index.jsx';
import TalkInput   from '../../components/talkInput/index.jsx';
import styles      from './talker.scss';

export default (props) => {
   const panel = <div>
    <TalkInput letters={props.letters}/>
    <LetterTable onClick={props.addLetter} letters={props.randomLetters}/>
  </div>;
  return (<div className="talker">
      <Avatar player={props.player} score={props.score}/>
      <h1 className="talker__header">
          <div>User the letters</div>
          <div>to describe the image</div>
      </h1>
      <img className="talker__image" src={props.image}/>
      {props.children || panel}
      </div>);
};

