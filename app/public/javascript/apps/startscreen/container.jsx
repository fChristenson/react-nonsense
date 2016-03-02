'use strict';

import Startscreen from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    inviteToGame: () => dispatch({type: 'INVITE_TO_GAME'}),
    joinGame: () => dispatch({type: 'JOIN_GAME'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Startscreen);

