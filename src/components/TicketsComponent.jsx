import React from 'react';
import Timestamp from 'react-timestamp';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import TicketForm from './TicketForm'

import firebase from 'firebase';

const TicketCard = (props) => {
  return (
    <Card className="ticketCard">
      <CardHeader title={props.title}
        avatar={props.user.photoUrl}
        subtitle={props.user.displayName}/>
      <CardText>
        { props.description }
      </CardText>
    </Card>
  );
}

const TicketList = (props) => {
  return (
    <div id='ticketsList'>
      {props.tickets.map( ticket => <TicketCard key={ticket.key} {...ticket}/>)}
    </div>
  );
}

class TicketComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      tickets: []
    };

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

  render(){
    return (
      <div>
        <TicketList tickets={ this.state.tickets }/>
        <TicketForm user={ this.state.user }/>
      </div>
    );
  };
}

export default TicketComponent;
