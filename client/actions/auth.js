// @flow
import Actions from 'constants/actions';

import { sendAuth } from 'services/api';

import type { FluxStandardAction } from 'typedef/FluxStandardAction';
import type jwt from 'jsonwebtoken';
import type { AuthRequest, User } from 'server/api';
import type { Dispatch, Store } from 'redux';

export type AuthActionLoading = FluxStandardAction<>;
export type AuthActionSuccess = FluxStandardAction<jwt>;
export type AuthActionFailure = FluxStandardAction<Error>;
export type AuthActionSetUser = FluxStandardAction<AuthRequest & { user: User, }>;
export type AuthActionReauthRequired = FluxStandardAction<>;
export type AuthActions = AuthActionLoading | AuthActionSuccess | AuthActionFailure | AuthActionSetUser;

/**
 * ```js
 * import auth from 'actions/auth';
 * ```
 *
 * auth action call
 *
 * @memberof module:app/actions
 * @param  {AuthRequest} payload
 * @return {Promise}
 * @requires constants/actions
 */
function auth(payload: AuthRequest) {
	return (dispatch: Dispatch, getState: Store.getState) => {
		dispatch({ type: Actions.AUTH_LOADING });

		return sendAuth(payload)
			.then((p) => {
				dispatch({
					type: Actions.SET_USER,
					payload: Object.assign({}, payload, p.user),
				});

				dispatch({
					type: Actions.AUTH_SUCCESS,
					payload: p.token,
				});

				return Promise.resolve();
			})
			.catch((err) => {
				dispatch({ type: Actions.AUTH_FAILURE, payload: err, error: true });
				return Promise.resolve();
			});
	};
}

export default auth;
