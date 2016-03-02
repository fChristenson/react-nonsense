'use strict';

import Guesser     from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    images: state.guesser.images,
    letters: state.guesser.letters,
    player: state.guesser.player,
    score: state.guesser.score
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incorrectChoice: () => dispatch({type: 'INCORRECT_CHOICE'}),
    correctChoice: () => dispatch({type: 'CORRECT_CHOICE'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesser);

