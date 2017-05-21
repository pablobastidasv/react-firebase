import React from 'react';
import Timestamp from 'react-timestamp';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';

import TicketsList from './TicketsList'
import TicketForm from './TicketForm'
import Conversation from './Conversation'

import firebase from 'firebase';

class TicketComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      tickets: [],
      ticketSel: null,
      editingTicket: false
    };

    this.showTicketDetail = this.showTicketDetail.bind(this);
    this.handleCloseTicket = this.handleCloseTicket.bind(this);

    this.ticketsRef = firebase.database()
      .ref('tickets')
      .child(props.user.company);
  }

  componentWillMount(){
    let _ticketsRef = null;
    if (this.state.user.companyAdmin){
      _ticketsRef = this.ticketsRef;
    } else {
      _ticketsRef = this.ticketsRef.orderByChild('userId').equalTo(this.state.user.uid);
    }

    _ticketsRef
      .limitToLast(10)
      .on('child_added', (snap) => {
        let newTicket = Object.assign({}, snap.val());
        if( newTicket.description.length > 250 ){
          newTicket.description = newTicket.description.substring(0, 250) + "..."
        }
        newTicket.key = snap.key;

        let tickets = this.state.tickets.slice()
        tickets.unshift(newTicket);

        this.setState({
          tickets
        });
      });
  }

  showTicketDetail(ticket){
    this.setState({
      editingTicket: !this.state.editingTicket,
      ticketSel: ticket
    });
  }

  handleCloseTicket(){
    this.setState({editingTicket: !this.state.editingTicket});
  }

  render(){
    return (
      <div>
        <TicketsList tickets={ this.state.tickets } onTouchTap={ this.showTicketDetail }/>
        <TicketForm user={ this.state.user }/>
        <Dialog
          title="Detalle del Ticket"
          modal={false}
          open={this.state.editingTicket}
          onRequestClose={this.handleCloseTicket}
          autoScrollBodyContent={true}
          repositionOnUpdate={true}
        >
          <Conversation ticket={this.state.ticketSel}/>
        </Dialog>
      </div>
    );
  };
}

export default TicketComponent;
