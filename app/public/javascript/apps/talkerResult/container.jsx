'use strict';

import TalkerResult from './index.jsx';
import { connect }  from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.talkerResult.player,
    score: state.talkerResult.score,
    image: state.talkerResult.image,
    selectedImage: state.talkerResult.selectedImage
  };
};

export default connect(mapStateToProps)(TalkerResult);

