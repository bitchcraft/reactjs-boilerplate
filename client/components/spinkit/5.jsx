import React from 'react';
import { withInjector } from '@bitchcraft/injector';
import stylesheet from './5.scsshbs';
import { compose, onlyUpdateForKeys } from 'recompose';


/**
 * SpinKit 5
 */
const SKFive = () => <div className='spinkit5-spinner' />;


const style = () => ({
	Color: '#333',
});

const enhance = compose(
	onlyUpdateForKeys([ '' ]),
	withInjector(stylesheet, style, { displayName: 'SpinKit5' }),
);

export default enhance(SKFive);
