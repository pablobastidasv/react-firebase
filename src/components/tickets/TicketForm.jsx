import React from 'react'

import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import firebase from 'firebase';

class TicketForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      openFormModal: false,
      openSnackbar: false,
      snackBarMsg: 'El ticket ha sido creado exitosamente.',
      user: props.user,
      ticket: {},
      typeErrorMsg: '',
      shortDescErrorMsg: '',
      detailErrorMsg: ''
    }

    this.ticketsRef = firebase.database()
      .ref('tickets')
      .child(props.user.company);

    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.saveTicket = this.saveTicket.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  openForm(){
    this.setState( { openFormModal: true } );
  }

  closeForm(){
    this.setState( { openFormModal: false } );
  }

  saveTicket(){
    let ticket = Object.assign({}, this.state.ticket);
    ticket.date = new Date().toISOString();
    ticket.priority = null;
    ticket.userId = this.state.user.uid
    ticket.user = {
      photoUrl: this.state.user.photoURL,
      displayName: this.state.user.displayName
    }
    ticket.state = 'NEW';
    this.ticketsRef.child(ticket.type).push( ticket );

    this.setState({
      ticket: {}
    })

    this.closeForm();
    this.setState({
      openSnackbar: true
    });
  }

  handleTitleChange(event, title){
    let ticket = Object.assign({}, this.state.ticket);
    ticket.title = title;
    this.setState({ticket})
  }

  handleDescriptionChange(event, description){
    let ticket = Object.assign({}, this.state.ticket);
    ticket.description = description;
    this.setState({ ticket })
  }

  handleTypeChange(event, index, value){
    let ticket = Object.assign({}, this.state.ticket);
    ticket.type = value;
    this.setState({ ticket })
  }

  render(){
    const actions = [
      <FlatButton label='Cancelar'
        primary={true}
        onTouchTap={this.closeForm}/>,
      <RaisedButton label='Crear'
        primary={true}
        onTouchTap={this.saveTicket}/>
    ];

    return (
      <div>
        <FloatingActionButton className='floatButon'
          secondary={true}
          onTouchTap={this.openForm}>
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
            title="Crear nuevo ticket"
            actions={actions}
            modal={true}
            autoScrollBodyContent={true}
            open={this.state.openFormModal}>
          <SelectField value={ this.state.ticket.type }
            onChange={ this.handleTypeChange }
            errorText={ this.state.typeErrorMsg }
            floatingLabelText="Tipo de ticket">
            <MenuItem key={1} value="Q" primaryText="Queja"/>
            <MenuItem key={2} value="P" primaryText="Petición" disabled={true}/>
            <MenuItem key={3} value="R" primaryText="Recurso" disabled={true}/>
            <MenuItem key={4} value="F" primaryText="Felicitación" disabled={true}/>
          </SelectField>
          <TextField floatingLabelText="Descripción Corta"
            value={this.state.ticket.title}
            errorText={ this.state.shortDescErrorMsg }
            onChange={this.handleTitleChange}
          />
          <TextField
            multiLine={true}
            rows={5}
            fullWidth={true}
            value={this.state.ticket.description}
            onChange={this.handleDescriptionChange}
            errorText={ this.state.detailErrorMsg }
            floatingLabelText="Detalle"
          />
        </Dialog>

        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.snackBarMsg}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({openSnackbar: false})}
        />
      </div>
    );
  }

}

export default TicketForm;
