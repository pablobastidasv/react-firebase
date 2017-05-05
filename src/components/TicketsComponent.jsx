import React from 'react';

const TicketCard = (props) => {
  render (
    <div>
      ...
    </div>
  );
}

const TicketList = (props) => {
  render(
    <div>
      ...
    </div>
  );
}

const TicketSearchForm = (props) => {
  render(
    <div>
      ...
    </div>
  );
}

class TicketComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PqrSearchForm />
        <PqrCardList />
      </div>
    );
  }
}

export default TicketComponent;
