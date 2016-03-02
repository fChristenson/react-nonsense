'use strict';

import Incorrect   from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.incorrect.player,
    score: state.incorrect.score
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scoreboard: () => dispatch({type: 'SCOREBOARD'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Incorrect);

