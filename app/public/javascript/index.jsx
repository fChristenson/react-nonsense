'use strict';

import React                     from 'react';
import ReactDOM                  from 'react-dom';
import routes                    from './apps/index.jsx'
import { match, Router, browserHistory } from 'react-router';

match({ history: browserHistory, routes }, (err, redirectLocation, props) => {
  ReactDOM.render(<Router {...props} />, document.getElementById('app'));
});

