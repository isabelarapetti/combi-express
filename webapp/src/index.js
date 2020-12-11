/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { SpinnerComponent } from './components/organisms';
import { GlobalState } from './GlobalState';

ReactDOM.render(
  <React.StrictMode>
    <SpinnerComponent spinnerService={GlobalState.SpinnerService}>
      <App />
    </SpinnerComponent>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
