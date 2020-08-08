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

  const sortedComments = [ ...props.post.comments ].sort((a, b) => {
    return a.id - b.id
  })

  return (
    <div style={commentSectionStyle}>
      {console.log(props)}
      <h2 style={headingStyle}>Comments</h2>
      {props.post && <CreateCommentForm post={props.post} user={props.user} msgAlert={props.msgAlert} postPageRefresh={props.postPageRefresh} setPostPageRefresh={props.setPostPageRefresh} />}
      {console.log('this is the post', props.post)}
      {props.post && sortedComments.map((comment, index) => (
        <Comment key={index} comment={comment} user={props.user} postPageRefresh={props.postPageRefresh} setPostPageRefresh={props.setPostPageRefresh} msgAlert={props.msgAlert} />
      ))}
    </div>
  )
}

export default CommentSection
