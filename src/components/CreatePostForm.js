import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import apiUrl from './../apiConfig.js'

const CreatePostForm = (props) => {
  const { msgAlert } = props

  // State for tracking inputs in the create post form
  const [post, setPost] = useState({
    title: '',
    body: '',
    topic: ''
  })

  // Handle changes to the form by updating the state
  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setPost({ ...post, ...updatedField })
  }

  // Upon closing of the modal, reset form to blank values
  const handleClose = () => {
    props.handleClose()
    setPost({
      title: '',
      body: ''
    })
  }

  // Handles 'create post' request to back-end
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('post details before submision', post)

    axios({
      method: 'POST',
      url: apiUrl + '/posts/',
      headers: {
        Authorization: `Token ${props.token}`
      },
      data: {
        post: post
      }
    })
      // Success alert box
      .then(() => {
        handleClose()
        msgAlert({
          heading: 'Posted Successfully',
          message: 'Your post has been added to the forum!',
          variant: 'success'
        })
        // Refreshes the Feed when to display the new post
        props.setRefresh(!props.refresh)
      })
      // Failure alert box
      .catch(() => {
        msgAlert({
          heading: 'Unable to post.',
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

  // Renders a modal with a form for creating a new post
  return (
    <div>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" name="title" value={post.title} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group>
                  <Form.Label>Topic</Form.Label>
                  <Form.Control as="select" value={post.topic} onChange={handleInputChange} name="topic">
                    <option value="General">General</option>
                    <option value="Sports">Sports</option>
                    <option value="Advice">Advice</option>
                    <option value="Pets">Pets</option>
                    <option value="Movies / TV">Movies / TV</option>
                    <option value="Books">Books</option>
                    <option value="Current Events">Current Events</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicBody">
              <Form.Label>Post Body</Form.Label>
              <Form.Control as="textarea" rows="4" placeholder="Text" name="body" value={post.body} onChange={handleInputChange} required />
            </Form.Group>
            <Modal.Footer style={modalFooterStyle}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Post
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreatePostForm
