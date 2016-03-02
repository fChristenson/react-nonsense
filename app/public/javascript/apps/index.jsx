'use strict';

import React                 from 'react';
import { Route, IndexRoute } from 'react-router/lib';
import Guesser               from './guesser/container.jsx';
import Lobby                 from './lobby/container.jsx';
import Talker                from './talker/container.jsx';
import Startscreen           from './startscreen/container.jsx';
import Invite                from './invite/container.jsx';
import Join                  from './join/container.jsx';
import Scoreboard            from './scoreboard/container.jsx';
import Correct               from './correct/container.jsx';
import Incorrect             from './incorrect/container.jsx';
import TalkerResult          from './talkerResult/container.jsx';

const App = props => <div className='content'>{props.children}</div>;

const Routes = <Route path="/" component={App}>
<IndexRoute component={Startscreen}/>
<Route path="result" component={Incorrect}/>
<Route path="incorrect" component={Incorrect}/>
<Route path="correct" component={Correct}/>
<Route path="invite" component={Invite}/>
<Route path="join" component={Join}/>
<Route path="lobby" component={Lobby}/>
<Route path="talker" component={Talker}/>
<Route path="guesser" component={Guesser}/>
<Route path="scoreboard" component={Scoreboard}/>
</Route>;

export default Routes;
