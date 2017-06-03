import React from 'react'

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';

import firebase from 'firebase'

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
          <FlatButton label="Cancelar" onTouchTap={this.handleShowForm}/>
          <RaisedButton label="Guardar" primary={true} onTouchTap={this.saveComment}/>
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

export default CommentForm;
