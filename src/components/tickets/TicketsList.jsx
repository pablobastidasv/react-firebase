import React from 'react'

import TicketCard from './TicketCard'

require ('./Tickets.scss')

const TicketsList = (props) => {
  return (
    <div id='ticketsList'>
      {props.tickets.map( ticket => <TicketCard key={ticket.key} miniSize={true} ticket={ticket} onTouchTap={props.onTouchTap}/>)}
    </div>
  );
}

export default TicketsList;
