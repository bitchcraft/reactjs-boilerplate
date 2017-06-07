import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { greenA700, grey600 } from 'material-ui/styles/colors';

import Store from 'containers/store';

import renderer from 'react-test-renderer';

import { expect } from 'jest';

describe('App', () => {
	it('should be able to run tests', () => {
		expect(1 + 2).toEqual(3);
	});
});

const options = {
	muiTheme: getMuiTheme({
		palette: {
			primary1Color: greenA700,
			textColor: grey600,
		},
	}),
};

it('renders correctly', () => {
	const tree = renderer.create(
		<MuiThemeProvider {...options}>
			<Store/>
		</MuiThemeProvider>
  ).toJSON();
	expect(tree).toMatchSnapshot();
});
