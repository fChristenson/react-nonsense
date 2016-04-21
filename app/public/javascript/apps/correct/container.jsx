'use strict';

import Correct     from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.game.player,
    round: state.game.round,
    code: state.game.inviteCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scoreboard: (round, code) => {
      if(round >= 3) {
        dispatch({type: 'SCOREBOARD', code});
      }
      else {
        dispatch({type: 'GUESSER_NEXT_ROUND', code});
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Correct);

