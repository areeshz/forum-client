import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import apiUrl from './../apiConfig'

const PostEdit = (props) => {
  const [post, setPost] = useState({
    title: props.post.title,
    body: props.post.body
  })
  console.log('edit props are', props)

  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setPost({ ...post, ...updatedField })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('time to submit changes')
    axios({
      method: 'PATCH',
      url: apiUrl + `/posts/${props.post.id}`,
      headers: {
        Authorization: `Token ${props.user.token}`
      },
      data: {
        post: post
      }
    })
      .then((response) => {
        console.log('patch response is', response)
        props.setPost(response.data)
      })
      .then(() => {
        props.setVersion('showing')
      })
      .catch(console.error)
  }

  return (
    <div>
      <h1>Editing: {props.post.title}</h1>
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
