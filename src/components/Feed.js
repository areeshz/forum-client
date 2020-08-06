import React, { useState, useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const Feed = (props) => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/feed'
    })
      .then(response => {
        console.log('response is', response)
        setPosts(response.data)
      })
      .catch(console.error)
  }, [])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitleChange = (event) => {
    event.preventDefault()

    const newTitle = event.target.value
    setTitle(newTitle)
  }

  const handleBodyChange = (event) => {
    event.preventDefault()

    const newBody = event.target.value
    setBody(newBody)
  }

  const [show, setShow] = useState(false)
  const [hoverInput, setHoverInput] = useState(false)

  const toggleHover = () => setHoverInput(!hoverInput)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const hoverStyle = {
    width: '500px',
    maxWidth: '80vw',
    margin: '20px auto',
    backgroundColor: 'rgb(255,255,255)'
  }

  const noHoverStyle = {
    width: '500px',
    maxWidth: '80vw',
    margin: '20px auto',
    backgroundColor: 'rgb(246,246,246)'
  }

  return (
    <div>
      <Form.Control style={hoverInput ? hoverStyle : noHoverStyle} placeholder="Create Post" onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={handleShow} readOnly />
      { !posts && <h1>Loading...</h1>}
      {posts && <h1>Got some posts, one by {posts[0].owner.email}</h1>}
      { posts && posts.map(post => (
        <Post key={post.id} title={post.title} author={post.owner} body={post.body} postid={post.id} />
      ))}

      <Modal show={show} onHide={handleClose} size="lg">
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

export default Feed
