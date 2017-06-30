import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from 'actions/auth';
import Actions from 'constants/actions';
import SignIn from 'components/signIn';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { SK5 } from 'components/spinkit';

const Loading = () => (
	<span
		style={{
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
		}}>
		<Card zDepth={1}>
			<CardHeader
				subtitle='Checking your credentials'
				title='Loading'/>
			<CardText>
				<SK5/>
			</CardText>
		</Card>
	</span>
);


function authorize(dispatch, user) {
	dispatch(auth(user));
}


const AuthWrapper = ({ children, dispatch, loading, fail, reauth, user }) => {
	if (loading) return <Loading/>;
	if (fail) return <SignIn onSubmit={payload => authorize(dispatch, payload)}/>;
	if (reauth) authorize(dispatch, user);

	return (
		<span
			style={{
				flexGrow: 1,
			}}>
			{children}
		</span>
	);
};


AuthWrapper.propTypes = {
	children: PropTypes.node,
	dispatch: PropTypes.func.isRequired,
	fail: PropTypes.bool,
	loading: PropTypes.bool,
	reauth: PropTypes.bool,
	user: PropTypes.objectOf(PropTypes.any),
};

const authState = (state, props) => {
	const authstate = state.app.getIn([ 'auth', 'state' ], Actions.AUTH_FAILURE);
	const loading = state.app.getIn([ 'auth', 'loading' ]);
	const fail = authstate === Actions.AUTH_FAILURE;
	const reauth = authstate === Actions.REAUTH_REQUIRED;
	const user = state.app.get('user');

	return {
		loading,
		fail,
		reauth,
		user,
	};
};

export default connect(authState)(AuthWrapper);
