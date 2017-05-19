import React from 'react';

import firebase from 'firebase';

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ContentAdd from 'material-ui/svg-icons/content/add';

// My Components
import TicketCard from './TicketCard'
import Comments from './Comments'

class CommentForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      showForm: false,
      comment: '',
      ticket: props.ticket
    };

    this.commentsRef = firebase.database()
      .ref('comments')
      .child(props.ticket.key);

    this.handleShowForm = this.handleShowForm.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }

  handleShowForm() {
    this.setState({
      showForm: !this.state.showForm,
      comment: ''
    });
  }

  handleChangeComment(event) {
    this.setState({
      comment: event.target.value
    });
  }

  saveComment(){
    let user = firebase.auth().currentUser;
    let comment = {
      comment: this.state.comment,
      date: new Date().toISOString(),
      userId: user.uid,
      user: {
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    };

    this.commentsRef.push(comment);

    this.handleShowForm();
  }

  render() {
    let form =
      <Card className='ticketCard'>
        <CardText>
          <TextField
            multiLine={true}
            rows={2}
            fullWidth={true}
            floatingLabelText="Comentario"
            value={ this.state.comment }
            onChange={ this.handleChangeComment }
            autoFocus
          />
        </CardText>

        <CardActions>
          <RaisedButton label="Cancelar" onTouchTap={this.handleShowForm}/>
          <RaisedButton label="Guardar" secondary={true} onTouchTap={this.saveComment}/>
        </CardActions>
      </Card>;

    return (
      <div>
        {this.state.showForm ? form : null}

        <FloatingActionButton className='floatButon'
          onTouchTap={this.handleShowForm}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

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
