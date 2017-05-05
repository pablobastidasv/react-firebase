import React from 'react';

const TicketCard = (props) => {
  return (
    <div>
      ...
    </div>
  );
}

const TicketList = (props) => {
  return (
    <div>
      ...
    </div>
  );
}

const TicketSearchForm = (props) => {
  return (
    <div>
      <input type="text"/>
    </div>
  );
}

class TicketComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <TicketSearchForm />
        <TicketList />
      </div>
    );
  };
}

export default TicketComponent;
