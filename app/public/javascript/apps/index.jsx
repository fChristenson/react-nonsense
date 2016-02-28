'use strict';

import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import Guesser               from './guesser/index.jsx';
import Lobby                 from './lobby/index.jsx';
import Talker                from './talker/index.jsx';
import Startscreen           from './startscreen/index.jsx';
import Scoreboard            from './scoreboard/index.jsx';

const App = props => <div className='content'>{props.children}</div>;

const Routes = <Route path="/" component={App}>
<IndexRoute component={Startscreen}/>
<Route path="lobby" component={Lobby}/>
<Route path="talker" component={Talker}/>
<Route path="guesser" component={Guesser}/>
<Route path="scoreboard" component={Scoreboard}/>
</Route>;

export default Routes;
