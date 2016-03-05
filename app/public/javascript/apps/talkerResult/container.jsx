'use strict';

import TalkerResult from './index.jsx';
import { connect }  from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.game.player.name,
    score: state.game.player.score,
    selectedImage: state.talkerResult.selectedImage
  };
};

export default connect(mapStateToProps)(TalkerResult);

