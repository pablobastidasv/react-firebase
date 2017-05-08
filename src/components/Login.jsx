import React from 'react'

import FlatButton from 'material-ui/FlatButton';
import { Card, CardText } from 'material-ui/Card';

class Login extends React.Component{

  render(){
    return (
      <div>
        <Card className='loginContainer'>
          <CardText>
              <button {...this.props} className='loginBtn loginBtn-google'
                label="Login" >Login with Google</button>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Login;
