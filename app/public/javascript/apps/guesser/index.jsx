'use strict';

import React     from 'react';
import Avatar    from '../../components/avatar/index.jsx';
import TalkInput from '../../components/talkInput/index.jsx';
import style     from './guesser.scss';

export default (props) => {
  var guessingImages = props.images.map(function(image, index) {
    var onClick = image.isValid ? props.correctChoice : props.incorrectChoice;
    return <img key={index} className="guesser__image" src={image.src} onClick={onClick}/>;
  });
  return (<div className="guesser">
      <Avatar player={props.player} score={props.score}/>
      <h1>
        <div className="guesser__headertop">Select the</div>
        <div className="guesser__headerbottom">correct image</div>
      </h1>
      <div className="guesser__imagecontainer">
      {guessingImages}
      </div>
      <TalkInput letters={props.letters}/>
      </div>);
};
