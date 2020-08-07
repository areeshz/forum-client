import React from 'react'

const Comment = (props) => {
  const { comment } = props
  const commentBoxStyle = {
    border: '1px solid black',
    borderRadius: '15px',
    width: '500px',
    maxWidth: '80vw',
    padding: '10px 15px',
    marginTop: '12px'
  }

  const bodyStyle = {
    whiteSpace: 'pre-wrap',
    marginBottom: '0',
    marginTop: '5px'
  }

  return (
    <div style={commentBoxStyle}>
      {console.log('the comment is', comment)}
      <small>{comment.owner.email}</small>
      { (comment.created_at.slice(0, 22)) !== (comment.updated_at.slice(0, 22)) && <small style={{ paddingLeft: '15px', display: 'inline-block' }}>(edited)</small>}
      <p style={bodyStyle}>{props.comment.body}</p>
    </div>
  )
}

export default Comment
