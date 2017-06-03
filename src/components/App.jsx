import React, { Component } from 'react';
import firebase from 'firebase';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,} from 'material-ui/styles/colors';

// My components
import MainContainer from './MainContainer'

import * as Config from '../config'

firebase.initializeApp(Config.firebase_config);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#065677",
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    //disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo500,
    //clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});

class App extends Component{

  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MainContainer />
      </MuiThemeProvider>
    );
  }

}

export default App;
