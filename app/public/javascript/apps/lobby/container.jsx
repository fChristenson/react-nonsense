'use strict';

import Lobby       from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    player: state.game.player
  };
};

export default connect(mapStateToProps)(Lobby);

