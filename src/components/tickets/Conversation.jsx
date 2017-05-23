import React from 'react';

import firebase from 'firebase';

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

import CommunicationComment from 'material-ui/svg-icons/communication/comment';

// My Components
import TicketCard from './TicketCard'
import Comments from './Comments'
import CommentForm from './CommentForm'


class Conversation extends React.Component {

  constructor(props){
    super();

    this.state = {
      ticket: props.ticket,
      comments: [],
      loadingComments: true
    };

    this.commentsRef = firebase.database()
      .ref('comments')
      .child(props.ticket.key);

    this.ticketRef = firebase.database()
      .ref('tickets')
      .child('rincon_parque')
      .child('Q')
      .child(props.ticket.key);

    this.loadComment = this.loadComment.bind(this);
    this.loadTicket = this.loadTicket.bind(this);
  }

  loadTicket(snap) {
    let ticket = Object.assign({}, this.state.ticket, {description:snap.val().description});
    this.setState({ticket});
  }

  loadComment(snap) {
    this.setState({loadingComments: true});
    let comment = Object.assign({}, snap.val(), {key:snap.key});

    let comments = this.state.comments.slice()
    comments.unshift(comment);

    this.setState({comments, loadingComments: false});

    window.dispatchEvent(new Event('resize'))
  }

  componentWillMount(){
    this.commentsRef.on('child_added', this.loadComment);
    this.ticketRef.once('value', this.loadTicket);
  }

  componentWillUnmount(){
    this.commentsRef.off('child_added', this.loadComment);
  }

  render() {

    return(
      <div style={{display:'flex', 'flexFlow':'column wrap', justifyContent: 'space-around'}}>
        <div>
          <TicketCard ticket={ this.state.ticket } />
        </div>
        <div>
          <Card className='ticketCard'>
            <CardHeader title='Comentarios'
              avatar={<Avatar icon={<CommunicationComment />} />}
              subtitle='A continuación los comentarios registrados del ticket'
            />
            <CardText>
              <CommentForm ticket={this.state.ticket}/>
              <Comments comments={ this.state.comments }/>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default Conversation;
