import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { default as grammarCorrecter } from './modules/grammarCorrecter/reducer';

const rootReducer = combineReducers({
	grammarCorrecter,
	routing: routerReducer
});

export default rootReducer;