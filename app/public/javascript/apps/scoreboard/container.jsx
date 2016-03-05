'use strict';

import Scoreboard  from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
 return {
   scores: state.game.scores 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endGame: () => dispatch({type: 'END_GAME'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);

