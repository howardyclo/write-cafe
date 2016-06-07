import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './App/App';

/**
 * Routes
 */
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';

export default [
{
	path: '/',
	component: App,
	indexRoute: Home,
	childRoutes: [
		Login
	]
}, NotFound]