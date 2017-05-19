import React from 'react'

// My components
import Comment from './Comment'

const Comments = ( {comments} ) => {
  return (
    <div style={{display:'flex', flexFlow:'column',justifyContent:'space-around'}}>
      { comments.map( comment => <Comment key={comment.key} {...comment} /> ) }
    </div>
  );
}

export default Comments
