import {
	DUMMYLIST_LOADING,
	DUMMYLIST_SUCCESS,
	REAUTH_REQUIRED,
} from 'constants/actions';

import { getDummyList } from 'services/api';

function dummyList() {
	return (dispatch, getState) => {
		dispatch({ type: DUMMYLIST_LOADING });

		const token = getState().app.getIn([ 'auth', 'token' ]);

		return getDummyList(token)
			.then((payload) => {
				if (!payload) return Promise.reject();

				dispatch({
					type: DUMMYLIST_SUCCESS,
					payload,
				});
				return Promise.resolve();
			})
			.catch((err) => {
				dispatch({ type: REAUTH_REQUIRED, err });
				return Promise.resolve();
			});
	};
}

export default dummyList;
