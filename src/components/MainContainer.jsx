import React, { Component } from 'react';

import firebase from 'firebase';

import TicketComponent from './tickets/TicketsComponent';
import Login from './Login'

import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'

const Menu = (props) => {
  return(
    <Drawer
      docked={false}
      width={200}
      open={props.open}
      onRequestChange={props.setOpenMenu}
    >
      <MenuItem onTouchTap={props.logout}
        leftIcon={ <ExitToApp /> }
      >
        Cerrar sesión
      </MenuItem>
    </Drawer>
  )
}

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
    this.logout = this.logout.bind(this);
    this.setOpenMenu = this.setOpenMenu.bind(this);
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
        this.setState({loadingLogin: false});
      }
    });
  }

  logout(){
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        user: null
      });
      this.handleCloseMenu();
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
    firebase.auth().signInWithPopup(provider)
      .then(r => console.log(`Email autenticado ${r.user.email}`))
      .catch(e => console.log(`Error ${e.code}: ${e.message}`));
  }

  renderApp(){
    if(this.state.user){
      return (
        <div>
          <AppBar title="PQRs" onLeftIconButtonTouchTap={this.handleCloseMenu}/>
          <Menu open={this.state.openMenu}
            handleClose={this.handleCloseMenu}
            logout={this.logout}
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
