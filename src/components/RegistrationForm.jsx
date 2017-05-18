import React from 'react'

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

const RegistrationForm = ({onRegister, userName, userEmail,
  company, handleCompanyChange, companySelectionError, companyItems,
  apartment, handleApartmentChange, apartmentInputError }) => {

  return (
    <div className="registrationForm">
      <form onSubmit={ onRegister }>
        <Card>
          <CardHeader title='Formulario de registro'
            subtitle='Ingrese la información requerida para continuar su inicio de sesión'
            avatar="./img/key.svg"/>
          <CardText>
            <div className="registrationForm">
              <TextField
                disabled={true}
                defaultValue={userName}
                floatingLabelText="Nombre"
              />
              <TextField
                disabled={true}
                defaultValue={userEmail}
                floatingLabelText="Correo electrónico"
              />
              <SelectField
                floatingLabelText="Copropiedad"
                value={company}
                onChange={handleCompanyChange}
                errorText={companySelectionError}
                required
              >
                {companyItems.map( item => <MenuItem key={ item.value } {...item}/>)}
              </SelectField>
              <TextField floatingLabelText='Apartamento'
                value={apartment}
                onChange={handleApartmentChange}
                errorText={ apartmentInputError }
              />
            </div>
          </CardText>
          <CardActions>
            <RaisedButton label="Guardar"
              type="submit"
              primary={true}/>
          </CardActions>
      </Card>
      </form>
    </div>
  );
}

export default RegistrationForm;
