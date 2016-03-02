'use strict';

import Lobby       from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    player: state.lobby.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startTalking: () => dispatch({type: 'START_TALKING'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

