/**
 * ```js
 * import Actions from 'constants/actions'
 * ```
 *
 * provides string constants
 *
 * @public
 * @module constants/actions
 * @requires npm:keymirror
 * @returns {Object}
 * ```js
 * {
 *	AUTH_LOADING,
 *	AUTH_SUCCESS,
 *	AUTH_FAILURE,
 *	DUMMYLIST_LOADING,
 *	DUMMYLIST_SUCCESS,
 *	REAUTH_REQUIRED,
 *	SET_USER,
 * }
 * ```
 */
import keymirror from 'keymirror';

export default keymirror({
	AUTH_LOADING: null,
	AUTH_SUCCESS: null,
	AUTH_FAILURE: null,
	DUMMYLIST_LOADING: null,
	DUMMYLIST_SUCCESS: null,
	REAUTH_REQUIRED: null,
	SET_USER: null,
});
