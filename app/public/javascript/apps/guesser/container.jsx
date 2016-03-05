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
    incorrectChoice: (selectedImage) => dispatch({type: 'INCORRECT_CHOICE', selectedImage}),
    correctChoice: (selectedImage) => dispatch({type: 'CORRECT_CHOICE', selectedImage })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesser);

