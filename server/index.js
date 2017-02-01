/* eslint-disable */

require('babel-polyfill');
require('isomorphic-fetch');

require('babel-register')({
    presets: ['es2015', 'stage-0', 'react'],
    plugins: [
        'add-module-exports',
        ["babel-plugin-module-alias", [
            { "src": "./app/components", "expose": "components" },
            { "src": "./common/tools", "expose": "tools" },
        ]]
    ]
});

require('./server');
