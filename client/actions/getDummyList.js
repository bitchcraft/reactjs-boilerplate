// @flow
import Actions from 'constants/actions';

import { getDummyList } from 'services/api';

import type { FluxStandardAction } from 'typedef/FluxStandardAction';
import type { DummyListResponse } from 'api-server/api';
import type { Dispatch, Store } from 'redux';

export type DummyListActionSuccess = FluxStandardAction<DummyListResponse>;
export type DummyListActionLoading = FluxStandardAction<>;
export type DummyListActions = DummyListActionSuccess | DummyListActionLoading;

/**
 * ```js
 * import getDummyList from 'actions/getDummyList';
 * ```
 *
 * dummyList action call
 *
 * @memberof module:client/actions
 * @param  {Object} payload
 * @return {Promise}
 * @requires constants/actions
 */
function dummyList() {
	return (dispatch: Dispatch, getState: Store.getState) => {
		dispatch({ type: Actions.DUMMYLIST_LOADING });

		const token = getState().app.getIn([ 'auth', 'token' ]);

		return getDummyList(token)
			.then((payload) => {
				if (!payload) return Promise.reject();

				dispatch({
					type: Actions.DUMMYLIST_SUCCESS,
					payload,
				});
				return Promise.resolve();
			})
			.catch((err) => {
				dispatch({ type: Actions.REAUTH_REQUIRED, payload: err, error: true });
				return Promise.resolve();
			});
	};
}

export default dummyList;
