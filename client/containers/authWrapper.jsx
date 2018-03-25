// @flow

import React from 'react';
import { connect } from 'react-redux';
import auth from 'actions/auth';
import Actions from 'constants/actions';
import SignIn from 'components/SignInView';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { SK5 } from 'components/spinkit';

import type { Map as ImmutableMap } from 'immutable';
import type { Element as ReactElement } from 'react';
import type { Dispatch } from 'redux';
import type { AuthRequest } from 'server/api';

const Loading = (props: { [string]: *, }) => (
	<span
		style={{
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
		}}>
		<Card elevation={1}>
			<CardContent>
				<Typography component='h2' gutterBottom variant='headline'>
					Loading
				</Typography>
				<Typography gutterBottom variant='subheading'>
					Checking your credentials
				</Typography>
				<SK5 />
			</CardContent>
		</Card>
	</span>
);


function authorize(dispatch: Dispatch, user: AuthRequest) {
	dispatch(auth(user));
}


type Props = {
	children: ReactElement<*>,
	dispatch: * => void,
	loading?: boolean,
	fail?: boolean,
	reauth?: boolean,
	user: ImmutableMap<string, *>,
};

const AuthWrapper = ({
	children,
	dispatch,
	loading,
	fail,
	reauth,
	user,
}: Props): ReactElement<*> => {

	if (loading) return <Loading />;
	if (fail) return <SignIn onSubmit={payload => authorize(dispatch, (payload: AuthRequest))} />;
	if (reauth) authorize(dispatch, user.toJS());

	return (
		<span
			style={{
				flexGrow: 1,
			}}>
			{children}
		</span>
	);
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
