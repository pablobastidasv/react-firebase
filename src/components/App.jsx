import React, { Component } from 'react';
import TicketComponent from './TicketsComponent';
import firebase from 'firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainContainer from './MainContainer'

import * as Config from '../config'

firebase.initializeApp(Config.firebase_config);

class App extends Component{

  render(){
    return (
      <MuiThemeProvider>
        <MainContainer />
      </MuiThemeProvider>
    );
  }

}

export default App;
