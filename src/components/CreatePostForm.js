import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const CreatePostForm = (props) => {
  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    console.log(post)
    const updatedField = { [event.target.name]: event.target.value }
    setPost({ ...post, ...updatedField })
  }

  const handleClose = () => {
    props.handleClose()
    setPost({
      title: '',
      body: ''
    })
  }

  return (
    <div>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" placeholder="Title" name="title" value={post.title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formBasicBody">
              <Form.Label>Post Body</Form.Label>
              <Form.Control as="textarea" rows="4" placeholder="Text" name="body" value={post.body} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit">
            POST
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreatePostForm
