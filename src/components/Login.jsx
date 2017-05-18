import React from 'react'

import FlatButton from 'material-ui/FlatButton';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress'

import firebase from 'firebase';

import RegistrationForm from './RegistrationForm'

class Login extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      company: null,
      apartment: '',
      companyItems: [],
      user: firebase.auth().currentUser
    };

    this.companiesRef = firebase.database().ref('/companies/');

    this.renderButton = this.renderButton.bind(this);
    this.register = this.register.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleApartmentChange = this.handleApartmentChange.bind(this);
    this.updateCompanyItems = this.updateCompanyItems.bind(this);
  }

  updateCompanyItems(snap){
    let companyItem = {
      value: snap.key,
      primaryText: snap.val().shortName
    };

    var companyItems = this.state.companyItems.slice()
    companyItems.push(companyItem);
    this.setState({
      companyItems
    });
  }

  componentWillMount(){
    this.companiesRef
      .orderByChild('shortName')
      .on('child_added', this.updateCompanyItems);
  }

  register(event){
    event.preventDefault();
    let isValid = true;

    // Company validation
    if(this.state.company){
      this.setState({companySelectionError: ""});
    } else {
      isValid = false;
      this.setState({companySelectionError: "Seleccione su copropiedad."});
    }

    // Apartment validation
    if(this.state.apartment && 0 !== this.state.length){
      this.setState({apartmentInputError: ""});
    } else {
      isValid = false;
      this.setState({apartmentInputError: "Seleccione el apartamento donde reside."});
    }

    if(isValid)
      this.props.onRegister(this.state.company, this.state.apartment);
  }

  handleApartmentChange(event, apartment){
    this.setState({apartment})
  }

  handleCompanyChange(event, index, value) {
    this.setState({
      company: value
    });
  }

  renderButton(){
    if(this.props.showSubscription){
      return (
        <RegistrationForm onRegister={ this.register }
          company={this.state.company}
          handleCompanyChange={ this.handleCompanyChange }
          apartment={ this.state.apartment }
          handleApartmentChange={ this.handleApartmentChange }
          companyItems={ this.state.companyItems }
          userName={ firebase.auth().currentUser.displayName }
          userEmail={ firebase.auth().currentUser.email }
          companySelectionError={ this.state.companySelectionError }
          apartmentInputError={ this.state.apartmentInputError }
        />
      );
    }else if(this.props.loading) {
      return (
        <Card className='loginContainer'>
          <CardText>
            <CircularProgress />
        </CardText>
      </Card>
      );
    } else {
      return (
        <Card className='loginContainer'>
          <CardText>
            <button onClick={ this.props.onClick } className='loginBtn loginBtn-google'
              label="Login" >Login with Google</button>
          </CardText>
        </Card>
      );
    }
  }

  render(){
    return (
      <div>
        { this.renderButton() }
      </div>
    );
  }
}

export default Login;
