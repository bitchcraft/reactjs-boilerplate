const path = require('path');
const webpackConfig = require('./webpack.config');

const { resolveLoader } = webpackConfig;
const { rules } = webpackConfig.module;

module.exports = {
	assetsDir: 'static/',
	components: 'app/{components,containers}/**/*.{js,jsx}',
	getComponentPathLine(componentPath) {
		const name = path.basename(componentPath, '.jsx');
		const dir = path.dirname(componentPath).replace('app/', '');
		return `import ${name} from '${dir}/${name}';`;
	},
	getExampleFilename(componentPath) {
		return componentPath.replace(/\.jsx?$/, '.examples.md');
	},
	sections: [
		{
			name: 'UI Components',
			components: 'app/components/**/*.jsx',
		},
		{
			name: 'UI Containers',
			components: 'app/containers/**/*.jsx',
		},
	],
	showUsage: true,
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'app/styleguidist/StyleguidistMuiWrapper'),
	},
	skipComponentsWithoutExample: true,
	webpackConfig: {
		module: {
			rules,
		},
		resolveLoader,
	},
};
