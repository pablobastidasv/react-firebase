import React from 'react'

import FlatButton from 'material-ui/FlatButton';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

const RegistrationForm = (props) => {
  return (
    <div className="registrationForm">
      <Card>
        <CardHeader title='Formulario de registro'
          subtitle='Ingrese la información requerida para continuar su inicio de sesión'
          avatar="./img/key.svg"/>
        <CardText>
          <div className="registrationForm">
            <TextField
              disabled={true}
              defaultValue='Pablo Bastidas'
              floatingLabelText="Nombre"
            />
            <TextField
              disabled={true}
              defaultValue='pablobastidasv@gmail.com'
              floatingLabelText="Correo electrónico"
            />
            <SelectField
              floatingLabelText="Conjunto residencial"
            >
              <MenuItem value='900798416' primaryText="Bassan soluciones integrales" />
              <MenuItem value='torres_barce' primaryText="Torres de Barcelona" />
              <MenuItem value='rincon_parque' primaryText="Rincon del parque" />
              <MenuItem value='niza_ix' primaryText="Niza IX" />
            </SelectField>
          </div>
        </CardText>
        <CardActions>
          <RaisedButton label="Guardar"
            primary={true}
            onTouchTap={ props.onRegister }/>
        </CardActions>
      </Card>
    </div>
  );
}

class Login extends React.Component{

  constructor(props){
    super(props);

    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(){
    if(this.props.showSubscription){
      return (
        <RegistrationForm onRegister={ this.props.onRegister }/>
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
