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
    lobby: (code) => {
      dispatch({type: 'LOBBY', code});
    },
    setCode: (code) => dispatch({type: 'SET_INPUT_CODE', code})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);

