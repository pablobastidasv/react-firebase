import React, { Component } from 'react';

import firebase from 'firebase';

import TicketComponent from './TicketsComponent';
import Login from './Login'

import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress'


class MainContainer extends Component{
  constructor(){
    super();
    this.state = {
      user: null,
      loadingLogin: true,
      showSubscription: false,
    }

    this.userRef = firebase.database().ref('/users/');

    this.onLogin = this.onLogin.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userExist(user.uid);
      } else {
        this.setState({loadingLogin: false});
      }
    });
  }

  userExist(uid){
    this.userRef.child(uid).once('value')
      .then(r => {
        let user = r.val()
        if(user){
          user.uid = r.key;
          this.updateLastLogin(uid);
          this.setState({user});
        } else {
          this.setState({
            loadingLogin: false,
            showSubscription: true
          });
        }
      })
      .catch(e => console.log(`Error ${e.code}: ${e.message}`));
  }

  updateLastLogin(uid){
    let lastLogin = new Date().toISOString();
    { lastLogin }
    this.userRef.child(uid)
      .update({ lastLogin });
  }

  createUser(company, apartment){
    let uid = firebase.auth().currentUser.uid;

    let currentUser = firebase.auth().currentUser;
    let registrationDate = new Date().toISOString();

    let newUser = {
      company, apartment,
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      lastLogin: registrationDate,
      registrationDate
    };

    this.userRef
      .child(uid)
      .set(newUser, () => this.userExist(uid));
  }

  onLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then(r => console.log(`Email autenticado ${r.user.email}`))
      .catch(e => console.log(`Error ${e.code}: ${e.message}`));
  }

  renderApp(){
    if(this.state.user){
      return (
        <div>
          <AppBar title="PQRs"/>
          <TicketComponent user={ this.state.user } />
        </div>
      );
    } else {
      return (
        <Login onClick={ this.onLogin }
          onRegister={ this.createUser }
          showSubscription={ this.state.showSubscription }
          loading={ this.state.loadingLogin }/>
      );
    }
  }

  render(){
    return (
      <div>
        <div className='container'>
          { this.renderApp() }
        </div>
      </div>
    );
  }
}

export default MainContainer;
