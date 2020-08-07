import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import apiUrl from './../apiConfig.js'

const CreatePostForm = (props) => {
  const { msgAlert } = props
  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  const handleInputChange = (event) => {
    event.preventDefault()
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

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('ready to submit, here is the data', post)

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
      .then(() => {
        handleClose()
        msgAlert({
          heading: 'Posted Successfully',
          message: 'Your post has been added to the forum!',
          variant: 'success'
        })
        props.setRefresh(!props.refresh)
      })
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

  return (
    <div>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" placeholder="Title" name="title" value={post.title} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formBasicBody">
              <Form.Label>Post Body</Form.Label>
              <Form.Control as="textarea" rows="4" placeholder="Text" name="body" value={post.body} onChange={handleInputChange} required />
            </Form.Group>
            <Modal.Footer style={modalFooterStyle}>
              <Button variant="secondary" onClick={handleClose}>
                CANCEL
              </Button>
              <Button variant="primary" type="submit">
                POST
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreatePostForm
