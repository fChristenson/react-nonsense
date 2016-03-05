'use strict';

import React     from 'react';
import Avatar    from '../../components/avatar/index.jsx';
import TalkInput from '../../components/talkInput/index.jsx';

const onClick = (image, fn) => () => fn(image)

export default (props) => {
  const guessingImages = props.images.map(function(image, index) {
    const makeChoice = image.isValid ? props.correctChoice : props.incorrectChoice;
    return <img key={index} className="guesser__image" src={image.src} onClick={onClick(image.src, makeChoice)}/>;
  });
  return (<div className="guesser">
      <Avatar player={props.player.name} score={props.player.score}/>
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
