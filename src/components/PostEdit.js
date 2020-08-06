import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PostEdit = (props) => {
  const [post, setPost] = useState({
    title: props.title,
    body: props.body
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setPost({ ...post, ...updatedField })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('time to submit changes')
  }

  return (
    <div>
      <h1>Editing: {post.title}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" placeholder="Title" name="title" value={post.title} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicBody">
          <Form.Label>Post Body</Form.Label>
          <Form.Control as="textarea" rows="4" placeholder="Text" name="body" value={post.body} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          POST
        </Button>
      </Form>
    </div>
  )
}

export default PostEdit
