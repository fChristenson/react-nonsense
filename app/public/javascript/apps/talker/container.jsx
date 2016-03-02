'use strict';

import Talker      from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.talker.player,
    score: state.talker.score,
    image: state.talker.image,
    letters: state.talker.letters,
    randomLetters: state.talker.randomLetters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLetter: letter => dispatch({type: 'ADD_LETTER', letter: letter})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Talker);

