'use strict';

import Guesser     from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    images: state.guesser.images,
    letters: state.game.letters,
    player: state.game.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rewardPoints: () => dispatch({type: 'REWARD_GUESSER_POINTS', points: 10}),
    incorrectChoice: (selectedImage) => dispatch({type: 'INCORRECT_CHOICE', selectedImage}),
    correctChoice: (selectedImage) => dispatch({type: 'CORRECT_CHOICE', selectedImage })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesser);

