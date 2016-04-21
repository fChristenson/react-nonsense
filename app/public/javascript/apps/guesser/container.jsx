'use strict';

import Guesser     from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    images: state.game.images,
    letters: state.game.letters,
    player: state.game.player,
    code: state.game.inviteCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rewardPoints: (code) => dispatch({type: 'REWARD_GUESSER_POINTS', points: 10, code}),
    incorrectChoice: (selectedImage, code) => dispatch({type: 'INCORRECT_CHOICE', selectedImage, code}),
    correctChoice: (selectedImage, code) => dispatch({type: 'CORRECT_CHOICE', selectedImage, code})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesser);

