'use strict';

import Talker      from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.game.player,
    image: state.talker.image,
    letters: state.game.letters,
    randomLetters: state.talker.randomLetters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLetter: (player, letter) => dispatch({
      type: 'ADD_LETTER', 
      letter: {
        id: Math.random(),
        player: player,
        letter 
      }})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Talker);

