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

  return (
    <div style={commentSectionStyle}>
      {console.log(props)}
      <h2 style={headingStyle}>Comments</h2>
      {props.post && <CreateCommentForm post={props.post} user={props.user} msgAlert={props.msgAlert} postPageRefresh={props.postPageRefresh} setPostPageRefresh={props.setPostPageRefresh} />}
      {console.log('this is the post', props.post)}
      {props.post && props.post.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  )
}

export default CommentSection
