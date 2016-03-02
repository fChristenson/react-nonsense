'use strict';

import Correct     from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.correct.player,
    score: state.correct.score
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scoreboard: () => dispatch({type: 'SCOREBOARD'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Correct);

