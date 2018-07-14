const path = require('path');
const webpackConfig = require('./webpack.config');

const { resolveLoader } = webpackConfig;
const { rules } = webpackConfig.module;

module.exports = {
	assetsDir: 'static/',
	components: 'client/{components,containers}/**/*.{js,jsx}',
	getComponentPathLine(componentPath) {
		const name = path.basename(componentPath, '.jsx');
		const dir = path.dirname(componentPath).replace('client/', '');
		return `import ${name} from '${dir}/${name}';`;
	},
	getExampleFilename(componentPath) {
		return componentPath.replace(/\.jsx?$/, '.examples.md');
	},
	sections: [
		{
			name: 'UI Components',
			components: 'client/components/**/*.jsx',
		},
		{
			name: 'UI Containers',
			components: 'client/containers/**/*.jsx',
		},
	],
	showUsage: true,
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'client/styleguidist/StyleguidistMuiWrapper'),
	},
	skipComponentsWithoutExample: true,
	webpackConfig: {
		module: {
			rules,
		},
		resolveLoader,
	},
};
