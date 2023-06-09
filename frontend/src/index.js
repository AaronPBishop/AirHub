import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/user';

import App from './App';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
};

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

const Root = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);