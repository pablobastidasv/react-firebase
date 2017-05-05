import React, { Component } from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCzFsTuwr6Y31K7JBGSC17HoPaM1DlhvOI",
  authDomain: "angular-firebase-93cc5.firebaseapp.com",
  databaseURL: "https://angular-firebase-93cc5.firebaseio.com",
  projectId: "angular-firebase-93cc5",
  storageBucket: "angular-firebase-93cc5.appspot.com",
  messagingSenderId: "346517573094"
};

firebase.initializeApp(firebaseConfig);

class App extends Component{

  render(){
    return (
      <div>
        Hello world!!!
      </div>
    );
  }

}

export default App;
