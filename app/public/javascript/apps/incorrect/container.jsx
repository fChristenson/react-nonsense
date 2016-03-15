'use strict';

import Incorrect   from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.game.player,
    round: state.game.round
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scoreboard: (round) => {
      if(round >= 3) {
        dispatch({type: 'SCOREBOARD'});
      }
      else {
        dispatch({type: 'GUESSER_NEXT_ROUND'});
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Incorrect);

