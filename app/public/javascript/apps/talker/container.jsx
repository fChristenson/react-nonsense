'use strict';

import Talker      from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.game.player,
    image: state.game.correctImage,
    letters: state.game.letters,
    randomLetters: state.talker.randomLetters,
    inviteCode: state.game.inviteCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLetter: (player, letter, code) => dispatch({
      type: 'ADD_LETTER',
      code,
      letter: {
        id: Math.random(),
        player,
        letter 
      }})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Talker);

