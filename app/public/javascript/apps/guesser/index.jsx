'use strict';

import React     from 'react';
import Avatar    from '../../components/avatar/index.jsx';
import TalkInput from '../../components/talkInput/index.jsx';
import R         from 'ramda';
import U         from '../../../../util';

const onClick = (image, fn) => () => fn(image)

  export default (props) => {
    const shuffle = U.shuffle(props.images);
    const guessingImages = shuffle.map((image, index) => {
      const correct    = R.compose(props.rewardPoints, props.correctChoice);
      const makeChoice = image.isValid ? correct : props.incorrectChoice;
      return <button className="guesser__button" key={index} onClick={onClick(image.src, makeChoice)}>
        <img className="guesser__image" src={image.src}/>
        </button>;
    });
    return (<div className="guesser">
        <Avatar player={props.player.name} color={props.player.color} score={props.player.score}/>
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
