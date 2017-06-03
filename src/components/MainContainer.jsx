import React, { Component } from 'react';

import firebase from 'firebase';

// My Components
import TicketComponent from './tickets/TicketsComponent';
import Login from './Login'
import Menu from './Menu'

// Third Party components
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress'

class MainContainer extends Component{
  constructor(){
    super();
    this.state = {
      user: null,
      loadingLogin: true,
      showSubscription: false,
      openMenu: false,
    }

    this.userRef = firebase.database().ref('/users/');
    this.companiesRef = firebase.database().ref('/companies/');

    this.onLogin = this.onLogin.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.createUser = this.createUser.bind(this);
    this.setOpenMenu = this.setOpenMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  setOpenMenu(open){
    this.setState({
      openMenu: open
    });
  }

  handleCloseMenu(){
    this.setState({
      openMenu: !this.state.openMenu
    })
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userExist(user.uid);
      } else {
        this.setState({
          loadingLogin: false,
          user: null,
          showSubscription: false,
          openMenu: !this.state.openMenu
        });
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

          this.companiesRef.child(user.company).child('admins')
            .once('value', r => {
              let value = r.val();
              if(value[user.uid]){
                user.companyAdmin = value[user.uid];
              }
              this.setState({user});
            });

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
    firebase.auth().signInWithRedirect(provider)
      .then(r => console.log(`Email autenticado ${r.user.email}`))
      .catch(e => console.log(`Error ${e.code}: ${e.message}`));
  }

  logout(){
    firebase.auth().signOut();
  }

  renderApp(){
    if(this.state.user){
      const title = <img src='../img/logo-socobi-header.png'></img>;
      return (
        <div>
          <AppBar title={ title } onLeftIconButtonTouchTap={this.handleCloseMenu}/>
          <Menu open={this.state.openMenu}
            handleLogout={ this.logout }
            handleClose={this.handleCloseMenu}
            setOpenMenu={this.setOpenMenu}
          />
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
