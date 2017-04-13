import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
	userName: false,
	addStreamerModal: false,
	editStreamerModal: false,
}

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<LocaleProvider locale={enUS}>
		    <App />
		</LocaleProvider>
	</Provider>,
  document.getElementById('root')
);
