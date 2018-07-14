// @flow
import Actions from 'constants/actions';
import { Map } from 'immutable';

import type { Map as ImmutableMap } from 'immutable';
import type { AuthActions } from 'actions/auth';

/**
 * loading client/reducer
 * @public
 * @memberof module:client/reducers
 * @param  {ImmutableMap} state -
 * ```js
 * {
 *     auth?: {
 *         state?: AuthState,
 *         loading?: boolean,
 *         token?: JWTToken,
 *     },
 *     user?: {
 *         admin: boolean,
 *         id: UserId,
 *     },
 * }
 * ```
 * @param  {AuthActions} action -
 * @return {ImmutableMap} state
 * @requires constants/actions
 * @requires npm:immutable
 */

const app = (state: ImmutableMap<string, *>, action: AuthActions) => {
	if (!Map.isMap(state)) state = Map();

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

export default app;
