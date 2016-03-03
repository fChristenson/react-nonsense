'use strict';

import styles                            from '../styles/index.js';
import React                             from 'react';
import ReactDOM                          from 'react-dom';
import routes                            from './apps/index.jsx'
import { match, Router, browserHistory } from 'react-router/lib';
import { Provider }                      from 'react-redux';
import { createStore }                   from 'redux';
import reducers                          from './reducers';

const init  = window.__INITIAL_STATE__;
const store = createStore(reducers, init);

match({ history: browserHistory, routes }, (err, redirectLocation, props) => {
  ReactDOM.render(<Provider store={store}><Router {...props} /></Provider>, document.getElementById('app'));
});

