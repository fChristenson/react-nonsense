'use strict';

import styles                            from '../styles/index.js';
import io                                from 'socket.io-client';
import React                             from 'react';
import ReactDOM                          from 'react-dom';
import routes                            from './apps/index.jsx'
import { match, Router, browserHistory } from 'react-router/lib';
import { Provider }                      from 'react-redux';
import { createStore, applyMiddleware }  from 'redux';
import reducers                          from './reducers';
import middlewares                       from './middlewares';

const socket    = io('http://localhost:3001');
const init      = window.__INITIAL_STATE__;
const makeStore = applyMiddleware(middlewares(socket))(createStore);
let   store     = makeStore(reducers, init);

socket.on('REMOTE_END_GAME', action => store.dispatch(action));
socket.on('REWARD_TALKER_POINTS', action => store.dispatch(action));
socket.on('GUESS_WAS_MADE', action => store.dispatch(action));
socket.on('REMOTE_SCOREBOARD', action => store.dispatch(action));
socket.on('REMOTE_ADD_LETTER', action => store.dispatch(action));
socket.on('START_TALKING', action => store.dispatch(action));

match({ history: browserHistory, routes }, (err, redirectLocation, props) => {
  ReactDOM.render(<Provider store={store}><Router {...props} /></Provider>, document.getElementById('app'));
});

