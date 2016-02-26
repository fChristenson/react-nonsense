'use strict';

import React                             from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Guesser                           from './guesser/index.jsx';
import Lobby                             from './lobby/index.jsx';
import Talker                            from './talker/index.jsx';
import Startscreen                       from './startscreen/index.jsx';
import Scoreboard                        from './scoreboard/index.jsx';

const App = <Router history={browserHistory}>
  <Route path="/" component={Startscreen}>
    <Route path="lobby" component={Lobby}/>
    <Route path="talker" component={Talker}/>
    <Route path="guesser" component={Guesser}/>
    <Route path="scoreboard" component={Scoreboard}/>
  </Route>
</Router>;

export default App;