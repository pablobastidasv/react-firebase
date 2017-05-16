const ADD_TICKET = 'ADD_TICKET';

const ticketsList = (state = [], action) => {
  let tickets = state.slice();

  switch (action.type) {
    case ADD_TICKET:
      tickets.unshift(action.ticket);
  }

  return tickets;
}

export default ListTickets;
