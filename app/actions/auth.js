import {
	AUTH_LOADING,
	AUTH_SUCCESS,
	AUTH_FAILURE,
	SET_USER,
} from 'constants/actions';

import { sendAuth } from 'services/api';

function auth(payload) {
	return (dispatch, getState) => {
		dispatch({ type: AUTH_LOADING });

		return sendAuth(payload)
			.then((p) => {
				dispatch({
					type: SET_USER,
					payload: Object.assign({}, payload, p.user),
				});

				dispatch({
					type: AUTH_SUCCESS,
					payload: p.token,
				});

				return Promise.resolve();
			})
			.catch((err) => {
				dispatch({ type: AUTH_FAILURE, err });
				return Promise.resolve();
			});
	};
}

export default auth;
