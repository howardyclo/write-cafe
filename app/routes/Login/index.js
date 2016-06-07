/**
 * Code splitting.
 * Allow load code on demand.
 */
export default {
	path: 'login',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./Login').default)
		});
	}
}