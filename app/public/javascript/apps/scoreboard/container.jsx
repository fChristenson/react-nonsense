'use strict';

import Scoreboard  from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
 return {
   scores: state.game.scores,
   code: state.game.inviteCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endGame: (code) => dispatch({type: 'END_GAME', code})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);

