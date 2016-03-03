'use strict';

let context = require.context('../javascript', true, /\.scss$/);
context.keys().forEach(context);

context = require.context('./', true, /\.scss$/);
context.keys().forEach(context);

