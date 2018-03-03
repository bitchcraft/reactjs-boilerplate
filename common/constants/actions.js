/**
 * ```js
 * import Actions from 'constants/actions'
 * ```
 *
 * provides string constants
 *
 * @public
 * @constant Actions
 * @memberof module:constants
 * @requires npm:@bitchcraft/keyconst
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
import keyconst from '@bitchcraft/keyconst';

const Actions = keyconst([
	'AUTH_LOADING',
	'AUTH_SUCCESS',
	'AUTH_FAILURE',
	'DUMMYLIST_LOADING',
	'DUMMYLIST_SUCCESS',
	'REAUTH_REQUIRED',
	'SET_USER',
]);

export default Actions;
