'use strict';

import Correct     from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.game.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scoreboard: () => dispatch({type: 'SCOREBOARD'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Correct);

