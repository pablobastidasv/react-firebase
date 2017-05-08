import React from 'react';
import Timestamp from 'react-timestamp';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import TicketForm from './TicketForm'

import firebase from 'firebase';

const TicketCard = (props) => {
  return (
    <Card className="ticketCard">
      <CardHeader title={props.title}
        avatar={firebase.auth().currentUser.photoURL}
        subtitle={firebase.auth().currentUser.displayName}/>
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
  );
}

const TicketList = (props) => {
  return (
    <div id='ticketsList'>
      {props.tickets.map( ticket => <TicketCard {...ticket}/>)}
    </div>
  );
}

class TicketComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      tickets: [
          {
            'key': '0',
            'title': 'Olor a mariguana',
            'date': 1493981280
          },
          {
            'key': '1',
            'title': 'Maquinas gym con problemas',
            'date': 1494024480
          },
          {
            'key': '2',
            'title': 'Ascensor balo',
            'date': 1494020040
          }
      ]
    };
  }

  render(){
    return (
      <div>
        <TicketList tickets={ this.state.tickets }/>
        <TicketForm />
      </div>
    );
  };
}

export default TicketComponent;
