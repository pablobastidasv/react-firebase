import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodosComponent from './components/todos/Main'

import ticketsApp from './reducers';

require('./main.scss');

injectTapEventPlugin();

let store = createStore(ticketsApp);

render(
  <Provider store={store}>
    <TodosComponent />
  </Provider>
  , document.getElementById('app'));
