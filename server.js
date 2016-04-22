'use strict';

import server from './app';

server.start((err) => {
  if(err) throw err;
  console.log('Running at: ', server.info.uri);
});
