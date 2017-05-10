import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

class TicketForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      openFormModal: false,
      openSnackbar: false,
      snackBarMsg: 'El ticket ha sido creado exitosamente.'
    }

    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.saveTicket = this.saveTicket.bind(this);
  }

  openForm(){
    this.setState( { openFormModal: true } );
  }

  closeForm(){
    this.setState( { openFormModal: false } );
  }

  saveTicket(){
    console.log("Saving the ticket");
    this.closeForm();
    this.setState({
      openSnackbar: true
    });
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
            open={this.state.openFormModal}>
          <TextField floatingLabelText="Descripción Corta"/>
          <TextField
            multiLine={true}
            rows={5}
            fullWidth={true}
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
