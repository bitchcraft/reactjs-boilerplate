// @flow

import React from 'react';
import { withInjector } from '@bitchcraft/injector';
import stylesheet from './root.scsshbs';

import type { Element as ReactElement } from 'react';


const RootContainer = ({ children }: { children: ReactElement<*>, }) => (
	<span
		style={{
			alignItems: 'stretch',
			bottom: 0,
			display: 'flex',
			justifyContent: 'stretch',
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
		}}>
		{children}
	</span>
);

RootContainer.displayName = 'RootContainer';

const styles = t => ({
	background: {
		color: '#F0F0F0',
	},
});

export default withInjector(stylesheet, styles)(RootContainer);
