'use strict';

import React     from 'react';
import Avatar    from '../../components/avatar/index.jsx';
import Header    from '../../components/header/index.jsx';
import TalkInput from '../../components/talkInput/index.jsx';

export default (props) => {
  var guessingImages = props.images.map(function(image, index) {
    var onClick = image.isValid ? props.correctChoice : props.incorrectChoice;
    return <img key={index} className="images__image" src={image.src} onClick={onClick}/>;
  });
  return (<div className="guesser">
      <Avatar player={props.player} score={props.score}/>
      <Header textTop={'Select the'} textBottom={'correct image'}>
      <div className="images">
      {guessingImages}
      </div>
      <TalkInput letters={props.letters}/>
      </Header>
      </div>);
};
