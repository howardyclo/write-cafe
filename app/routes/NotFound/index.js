/**
 * Code splitting.
 * Allow load code on demand.
 */
export default {
	path: '*',
	status: 404,
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./NotFound').default)
		});
	}
}