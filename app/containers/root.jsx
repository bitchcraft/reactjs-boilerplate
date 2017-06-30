import React from 'react';
import PropTypes from 'prop-types';
import inject from 'tools/injectStyles';
import stylesheet from './root.scsshbs';

const RootContainer = ({ children }) => (
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

RootContainer.propTypes = {
	children: PropTypes.node,
};

const styles = t => ({
	background: {
		color: '#F0F0F0',
	},
});

export default inject(stylesheet, styles, { theme: {} })(RootContainer);
