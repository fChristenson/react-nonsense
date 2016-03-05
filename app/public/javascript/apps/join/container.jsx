'use strict';

import Join        from './index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    code: state.join.code
  };
};

const mapDispatchToProps = dispatch => {
  return {
    lobby: (talkers) => {
      const id           = Math.random();
      const playerNumber = talkers.length + 2;
      const talker       = {id, name: 'P' + playerNumber, score: 0};
      dispatch({type: 'LOBBY', talker})
    },
    setCode: (code) => dispatch({type: 'SET_INPUT_CODE', code: code})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);

