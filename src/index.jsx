import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin';

require('./main.scss');

injectTapEventPlugin();

render(
    <App />
  , document.getElementById('app'));
