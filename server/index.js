/* eslint-disable */

require('babel-polyfill');
require('isomorphic-fetch');

require('babel-register')({
    presets: ['es2015', 'stage-0', 'react', 'flow'],
    plugins: [
        'add-module-exports',
        ["module-resolver", {
          "root": ["./"],
          "alias": {
            "app": "./app",
            "containers": "./app/containers",
            "tools": "./common/tools"
          }
          }
        ]
    ]
});

require('./server');
