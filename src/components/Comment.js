import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

import CommentEditForm from './CommentEditForm'
import apiUrl from './../apiConfig'

const Comment = (props) => {
  const { comment, msgAlert } = props

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const deleteHandler = () => {
    console.log('time to delete')

    axios({
      method: 'DELETE',
      url: apiUrl + `/comments/${props.comment.id}`,
      headers: {
        Authorization: `Token ${props.user.token}`
      }
    })
      .then(() => {
        msgAlert({
          heading: 'Removed comment.',
          message: 'Your comment has been removed from the thread.',
          variant: 'success'
        })
      })
      .then(() => {
        props.setPostPageRefresh(!props.postPageRefresh)
      })
      .catch(() => {
        msgAlert({
          heading: 'Unable to remove comment.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }

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

  const buttonStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    marginRight: '10px'
  }

  return (
    <div style={commentBoxStyle}>
      <small>{comment.owner.email}</small>
      { (comment.created_at.slice(0, 22)) !== (comment.updated_at.slice(0, 22)) && <small style={{ paddingLeft: '15px', display: 'inline-block' }}>(edited)</small>}
      { props.user && (props.user.id === comment.owner.id) && <React.Fragment>
        <Button style={buttonStyle} variant="outline-warning" size="sm" onClick={handleShow}>Edit</Button>
        <Button style={buttonStyle} variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
      </React.Fragment>}
      <p style={bodyStyle}>{props.comment.body}</p>
      <CommentEditForm currentComment={comment} show={show} handleClose={handleClose} user={props.user} msgAlert={msgAlert} setPostPageRefresh={props.setPostPageRefresh} postPageRefresh={props.postPageRefresh} />
    </div>
  )
}

export default Comment
