import React from 'react'

import Timestamp from 'react-timestamp'
import Paper from 'material-ui/Paper'

require ('./Tickets.scss')

const Comment = ( { comment, date, user } ) => {
  return (
    <Paper className='comment' zDepth={1}>
      <div>
        <span>{user.displayName}</span> dijo:
      </div>
      <div>
        { comment }
      </div>
      <div>
        <Timestamp time={ date } format='full'/>
      </div>
    </Paper>
  );
}

export default Comment;
