import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router/router';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './storage/store';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<Provider store={store}>
			<Router />
		</Provider>
  </React.StrictMode>
);