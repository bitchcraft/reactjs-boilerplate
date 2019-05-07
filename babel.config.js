module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-flow',
	],
	plugins: [
		'add-module-exports',
		'react-hot-loader/babel',
		'@babel/plugin-transform-runtime',
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
