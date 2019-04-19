// required for generators, etc.
require('@babel/polyfill'); // require('@babel/polyfill/noConflict')?
// Fetch API
require('isomorphic-fetch');
// hooks to require
require('@babel/register');

require('./server');
