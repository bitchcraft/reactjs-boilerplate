import Actions from 'constants/actions';
import Immutable from 'immutable';

const loading = (state, action) => {
	if (!Immutable.Map.isMap(state)) state = Immutable.Map();

	const { type, payload } = action;

	switch (type) {
		case Actions.AUTH_LOADING:
			return state
				.setIn([ 'auth', 'loading' ], true);

		case Actions.AUTH_SUCCESS:
			return state
				.setIn([ 'auth', 'state' ], Actions.AUTH_SUCCESS)
				.setIn([ 'auth', 'loading' ], false)
				.setIn([ 'auth', 'token' ], payload);

		case Actions.AUTH_FAILURE:
			return state
				.setIn([ 'auth', 'state' ], Actions.AUTH_FAILURE)
				.setIn([ 'auth', 'loading' ], false);

		case Actions.REAUTH_REQUIRED:
			return state
				.setIn([ 'auth', 'state' ], Actions.REAUTH_REQUIRED)
				.setIn([ 'auth', 'loading' ], false)
				.deleteIn([ 'auth', 'token' ]);

		case Actions.SET_USER:
			return state
				.set('user', payload);

		default:
	}

	return state;
};

export default loading;
