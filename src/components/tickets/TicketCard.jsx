import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card'

class TicketCard extends React.Component {

  constructor(props) {
    super(props);

    let actionable = props.onTouchTap !== undefined;
    let style = actionable ? {cursor: 'pointer'} : {};
    style = props.miniSize ? Object.assign({}, style, {width:'300px', margin:'5px'}) : style;

    this.state = {
      ticket: props.ticket,
      onTouchTap: props.onTouchTap,
      actionable: actionable,
      cardStyle: style
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap(){
    if(this.state.actionable){
      this.state.onTouchTap(this.state.ticket);
    }
  }

  render(){
    return (
      <Card onTouchTap={ this.handleTouchTap  }
        style={this.state.cardStyle}
        className="ticketCard">
        <CardHeader title={this.state.ticket.title}
          avatar={this.state.ticket.user.photoUrl}
          subtitle={this.state.ticket.user.displayName}/>
        <CardText>
          { this.state.ticket.description }
        </CardText>
      </Card>
    );
  }
}

export default TicketCard;
