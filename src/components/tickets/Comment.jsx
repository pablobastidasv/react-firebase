import React from 'react'

import { Card, CardText } from 'material-ui/Card'

const Comment = ( { comment } ) => {
  return (
    <div>
      <Card className='ticketCard'>
        <CardText>
          { comment }
        </CardText>
      </Card>
    </div>
  );
}

export default Comment;
