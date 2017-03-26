
import React from 'react';
import {Route, IndexRoute } from 'react-router';
import LoginScreen from './Views/LoginScreen';
import Dashboard from './Views/Dashboard';
import App from './App';

export default (
		<Route path="/" component={App}>				
				<IndexRoute component={LoginScreen}/>
				<Route path="dashboard" component={Dashboard} />
		</Route>
);

/* eslin-disable */