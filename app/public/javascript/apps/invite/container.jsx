'use strict';

import Invite      from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {inviteCode: state.invite.inviteCode};
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch({type: 'START_GAME'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);

