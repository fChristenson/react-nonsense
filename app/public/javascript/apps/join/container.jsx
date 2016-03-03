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
    lobby: () => dispatch({type: 'LOBBY'}),
    setCode: (code) => dispatch({type: 'SET_INPUT_CODE', code: code})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);

