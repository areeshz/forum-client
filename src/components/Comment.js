import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

import CommentEdit from './CommentEdit'
import apiUrl from './../apiConfig'

const Comment = (props) => {
  const { comment, msgAlert } = props
  const [editing, setEditing] = useState(false)
  const [updatedComment, setUpdatedComment] = useState({
    body: comment.body,
    post: comment.post
  })

  const editHandler = () => {
    console.log('time to edit')
    setEditing(true)
  }

  const cancelEdit = () => {
    setUpdatedComment({
      body: comment.body,
      post: comment.post
    })
    setEditing(false)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    console.log('time to submit the form', updatedComment)
    axios({
      method: 'PATCH',
      url: apiUrl + `/comments/${comment.id}`,
      headers: {
        Authorization: `Token ${props.user.token}`
      },
      data: {
        comment: updatedComment
      }
    })
      .then(() => {
        msgAlert({
          heading: 'Comment Updated.',
          message: 'Your comment has been updated.',
          variant: 'success'
        })
      })
      .then(() => {
        console.log('time for a refresh!')
        props.setPostPageRefresh(!props.postPageRefresh)
      })
      .then(() => {
        console.log('now turn off editing')
        setEditing(false)
      })
      .catch(() => {
        msgAlert({
          heading: 'Unable to update comment.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }

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
      { props.user && !editing && (props.user.id === comment.owner.id) && <React.Fragment>
        <Button style={buttonStyle} variant="outline-warning" size="sm" onClick={editHandler}>Edit</Button>
        <Button style={buttonStyle} variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
      </React.Fragment>}
      {!editing && <p style={bodyStyle}>{props.comment.body}</p>}
      {editing && <CommentEdit submitHandler={submitHandler} updatedComment={updatedComment} setUpdatedComment={setUpdatedComment} cancelEdit={cancelEdit}/>}
    </div>
  )
}

export default Comment
