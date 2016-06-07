/**
 * Code splitting.
 * Allow load code on demand.
 */
export default {
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./Home').default)
		});
	}
}