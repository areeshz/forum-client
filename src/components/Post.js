import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const Post = (props) => {
  const { user, msgAlert } = props
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

  const buttonStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    marginRight: '10px'
  }

  const deleteHandler = (event) => {
    event.stopPropagation()

    axios({
      method: 'DELETE',
      url: apiUrl + '/posts/' + props.postid,
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
      .then(() => {
        msgAlert({
          heading: 'Deleted Successfully',
          message: 'Your post has been removed.',
          variant: 'success'
        })
        props.setRefresh(!props.refresh)
      })
      .catch(() => {
        msgAlert({
          heading: 'Delete Unsuccessful',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  const editHandler = (event) => {
    event.stopPropagation()

    console.log('editing time')
  }

  return (
    <div style={postBoxStyle} onClick={handleClick}>
      <small>Posted by {props.author.email}</small>
      { user && (user.id === props.author.id) && <React.Fragment>
        <Button style={buttonStyle} variant="outline-warning" size="sm" onClick={editHandler}>Edit</Button>
        <Button style={buttonStyle} variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
      </React.Fragment>}
      <p style={titleStyle}>{props.title}</p>
      <p>{props.body}</p>
      { show && <Redirect to={`/posts/${props.postid}`} />}
    </div>
  )
}

export default Post
