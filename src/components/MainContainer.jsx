import React, { Component } from 'react';

import firebase from 'firebase';

import TicketComponent from './TicketsComponent';
import Login from './Login'

import AppBar from 'material-ui/AppBar';


class MainContainer extends Component{
  constructor(){
    super();
    this.state = {
      user: null
    }
    this.userRef = firebase.database().ref('/users/');
    this.onLogin = this.onLogin.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userExist(user.uid);
      }
    });
  }

  userExist(uid){
    this.userRef.child(uid).once('value')
      .then(r => {
        let user = r.val();
        if(user){
          this.setState({user});
        } else {
          this.createUser(uid);
        }
      })
      .catch(e => console.log(`Error ${e.code}: ${e.message}`));
  }

  createUser(uid){
    let currentUser = firebase.auth().currentUser;
    let newUser = {
      company: '900798416',
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL
    };
    this.userRef
      .child(uid)
      .push(newUser, () => this.userExist(uid));
  }

  onLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
    .then(r => console.log(`Email autenticado ${r.user.email}`))
    .catch(e => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderApp(){
    if(this.state.user){
      return (
        <TicketComponent user={ this.state.user } />
      );
    } else {
      return (
        <Login onClick={ this.onLogin }/>
      );
    }
  }

  render(){
    return (
      <div>
        <AppBar title="PQRs"/>
        <div className='container'>
          { this.renderApp() }
        </div>
      </div>
    );
  }
}

export default MainContainer;
