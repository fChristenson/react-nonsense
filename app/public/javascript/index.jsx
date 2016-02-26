'use strict';

import React                             from 'react';
import ReactDOM                          from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Guesser                           from './apps/guesser/index.jsx';
import Lobby                             from './apps/lobby/index.jsx';
import Talker                            from './apps/talker/index.jsx';
import Startscreen                       from './apps/startscreen/index.jsx';
import Scoreboard                        from './apps/scoreboard/index.jsx';

const App = <Router history={browserHistory}>
  <Route path="/" component={Startscreen}>
    <Route path="lobby" component={Lobby}/>
    <Route path="talker" component={Talker}/>
    <Route path="guesser" component={Guesser}/>
    <Route path="scoreboard" component={Scoreboard}/>
  </Route>
</Router>;

ReactDOM.render(App, document.getElementById('app'));