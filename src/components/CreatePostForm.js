import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const CreatePostForm = (props) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitleChange = (event) => {
    event.preventDefault()
    console.log(title)

    const newTitle = event.target.value
    setTitle(newTitle)
  }

  const handleBodyChange = (event) => {
    event.preventDefault()
    console.log(body)

    const newBody = event.target.value
    setBody(newBody)
  }

  const handleClose = () => {
    props.handleClose()
    setTitle('')
    setBody('')
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
              <Form.Control type="text" placeholder="Title" name="title" value={title} onChange={handleTitleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicBody">
              <Form.Label>Post Body</Form.Label>
              <Form.Control as="textarea" rows="4" placeholder="Text" name="body" value={body} onChange={handleBodyChange} />
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
