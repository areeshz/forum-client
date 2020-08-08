import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import apiUrl from './../apiConfig.js'

const CommentEditForm = (props) => {
  // States for keeping track of the modal form inputs
  const [newComment, setNewComment] = useState({
    body: props.currentComment.body,
    post: props.currentComment.post
  })

  // Handles changes to the modal 'edit' form by updating the state
  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setNewComment({ ...newComment, ...updatedField })
  }

  // When the modal closes, reset the text boxes & state
  const handleClose = () => {
    props.handleClose()
    setNewComment({
      body: props.currentComment.body,
      post: props.currentComment.post
    })
  }

  //  To maintain order of comments when a comment is deleted
  // Reset the modal forms when a comment is deleted
  useEffect(() => {
    setNewComment({
      body: props.currentComment.body,
      post: props.currentComment.post
    })
  }, [props])

  // Handles 'update comment' request to back-end
  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'PATCH',
      url: apiUrl + `/comments/${props.currentComment.id}`,
      headers: {
        Authorization: `Token ${props.user.token}`
      },
      data: {
        comment: newComment
      }
    })
      // Upon success, closes modal and displays alert box
      .then((response) => {
        handleClose()
        props.msgAlert({
          heading: 'Updated Successfully',
          message: 'Your comment has been updated.',
          variant: 'success'
        })
        // Refreshes the PostPage component so that latest comment edits are shown
        props.setPostPageRefresh(!props.postPageRefresh)
        return response
      })
      // Sets modal inputs and state to new comment values
      .then((response) => {
        setNewComment({
          body: response.data.body,
          post: response.data.post
        })
      })
      // Failure alert box
      .catch(() => {
        props.msgAlert({
          heading: 'Unable to update comment.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }

  const modalFooterStyle = {
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0'
  }

  // Render modal with form for editing comments
  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicBody">
              <Form.Control as="textarea" rows="4" placeholder="Text" name="body" value={newComment.body} onChange={handleInputChange} required />
            </Form.Group>
            <Modal.Footer style={modalFooterStyle}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CommentEditForm
