import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import apiUrl from './../apiConfig.js'

const CommentEditForm = (props) => {
  const [newComment, setNewComment] = useState({
    body: props.currentComment.body,
    post: props.currentComment.post
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setNewComment({ ...newComment, ...updatedField })
  }

  const handleClose = () => {
    props.handleClose()
    setNewComment({
      body: props.currentComment.body,
      post: props.currentComment.post
    })
    console.log(newComment)
  }

  //  To reorder things when an item is deleted
  useEffect(() => {
    setNewComment({
      body: props.currentComment.body,
      post: props.currentComment.post
    })
  }, [props])

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('ready to submit, here is the data', newComment, props.currentComment.id)

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
      .then((response) => {
        console.log('response', response)
        handleClose()
        props.msgAlert({
          heading: 'Updated Successfully',
          message: 'Your comment has been updated.',
          variant: 'success'
        })
        props.setPostPageRefresh(!props.postPageRefresh)
        return response
      })
      .then((response) => {
        console.log('responseAgain', response)
        setNewComment({
          body: response.data.body,
          post: response.data.post
        })
      })
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
