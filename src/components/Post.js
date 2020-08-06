import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Post = (props) => {
  const [show, setShow] = useState(null)

  const handleClick = () => {
    setShow(true)
  }

  const postBoxStyle = {
    border: '1px solid black',
    width: '500px',
    margin: '20px auto',
    padding: '10px 20px 10px 20px',
    borderRadius: '7px',
    maxWidth: '80vw'
  }

  const titleStyle = {
    fontSize: '20px',
    margin: '16px 0',
    fontWeight: '500'
  }

  return (
    <div style={postBoxStyle} onClick={handleClick}>
      <small>Posted by {props.author.email}</small>
      <p style={titleStyle}>{props.title}</p>
      <p>{props.body}</p>
      { show && <Redirect to={`/posts/${props.postid}`} />}
    </div>
  )
}

export default Post
