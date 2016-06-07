/**
 * Entry point
 */

import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './redux/store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router routes={routes} history={history}></Router>
  	</Provider>,
  	document.getElementById('app')
);