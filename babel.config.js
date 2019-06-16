module.exports = {
	presets: [
		['@babel/preset-env', {
			useBuiltIns: 'usage',
			corejs: { version: 3, proposals: true },
		}],
		'@babel/preset-react',
		'@babel/preset-flow',
	],
	plugins: [
		'add-module-exports',
		'react-hot-loader/babel',
		['@babel/plugin-transform-runtime', process.env.NODE_ENV === 'test' ? {} : { // for some reason this plugin b0rks in jest now, invetigating
			corejs: 3,
		}],
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-class-properties',
		[ 'module-resolver', {
			root: './',
			alias: {
				'api-server': './api-server',
				actions: './client/actions',
				app: './client',
				components: './client/components',
				constants: './client/constants',
				containers: './client/containers',
				server: './server',
				services: './client/services',
				typedef: './client/typedef',
			},
		} ],
	],
};
