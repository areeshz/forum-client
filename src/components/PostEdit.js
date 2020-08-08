import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import apiUrl from './../apiConfig'

const PostEdit = (props) => {
  // State to track the inputs in the edit post form
  const [post, setPost] = useState({
    title: props.post.title,
    body: props.post.body
  })

  // Handles changes to the form by updating the state
  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setPost({ ...post, ...updatedField })
  }

  // Handles 'update post' request to back-end
  const handleSubmit = (event) => {
    event.preventDefault()
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
      // Success alert box & updates the state with the latest verion of the post
      .then((response) => {
        props.msgAlert({
          heading: 'Post Updated',
          message: 'Your post has been updated successfully.',
          variant: 'success'
        })
        props.setPost(response.data)
      })
      // Changes component to 'showing' mode to display latest changes and remove the editing form
      .then(() => {
        props.setVersion('showing')
      })
      // Failure alert box
      .catch(() => {
        props.msgAlert({
          heading: 'Unable to update.',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    '&button': {
      marginLeft: '30px'
    }
  }

  const cancelButtonStyle = {
    marginRight: '10px'
  }

  // Renders form for editing a post
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
        <Form.Group style={buttonGroupStyle}>
          <Button variant="secondary" style={cancelButtonStyle} onClick={() => { props.setVersion('showing') }}>Cancel</Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default PostEdit
