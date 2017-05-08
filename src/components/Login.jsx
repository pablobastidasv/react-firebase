import React from 'react'

import FlatButton from 'material-ui/FlatButton';

class Login extends React.Component{

  render(){
    return (
      <div>
        <FlatButton {...this.props}
          label="Login" />
      </div>
    );
  }
}

export default Login;
