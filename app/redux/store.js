import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './root-reducer';

const createStoreWithMiddleware = applyMiddleware(
	routerMiddleware(browserHistory),
	thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, /* initial app state from client or server */);
}