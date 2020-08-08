import React from 'react'

import Comment from './Comment'
import CreateCommentForm from './CreateCommentForm'

const CommentSection = (props) => {
  const headingStyle = {
    fontSize: '20px'
  }

  const commentSectionStyle = {
    margin: '25px auto 0',
    width: '700px',
    maxWidth: '80vw',
    paddingBottom: '12px'
  }

  // Sorts the comments with oldest comment first
  const sortedComments = [ ...props.post.comments ].sort((a, b) => {
    return a.id - b.id
  })

  // Renders each Comment for the post
  // Renders CreateCommentForm component if the user is signed in
  return (
    <div style={commentSectionStyle}>
      <h2 style={headingStyle}>Comments</h2>
      {props.post && props.user &&
        <CreateCommentForm post={props.post} user={props.user} msgAlert={props.msgAlert} postPageRefresh={props.postPageRefresh} setPostPageRefresh={props.setPostPageRefresh} />
      }
      {props.post && sortedComments.map((comment, index) => (
        <Comment key={index} comment={comment} user={props.user} postPageRefresh={props.postPageRefresh} setPostPageRefresh={props.setPostPageRefresh} msgAlert={props.msgAlert} />
      ))}
    </div>
  )
}

export default CommentSection
