'use strict';

import Invite      from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {inviteCode: state.game.inviteCode};
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: (code) => dispatch({type: 'START_GAME', code})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);

