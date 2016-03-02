'use strict';

import Join        from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    inviteCode: state.join.inviteCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    lobby: () => dispatch({type: 'LOBBY'}),
    setInviteCode: (inviteCode) => dispatch({type: 'SET_INVITE_CODE', inviteCode: inviteCode})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);

