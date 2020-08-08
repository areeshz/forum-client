import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from './../apiConfig'

const CreateCommentButton = (props) => {
  const { user, msgAlert } = props

  //  State to track the inputs in the create comment form
  const [comment, setComment] = useState({
    body: '',
    post: props.post.id
  })

  // Handles changes to the form by updating the state
  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setComment({ ...comment, ...updatedField })
  }

  //  Handles 'create comment' request to back-end
  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: apiUrl + '/comments/',
      headers: {
        Authorization: `Token ${user.token}`
      },
      data: {
        comment
      }
    })
      // Resets form upon success
      .then(() => {
        setComment({
          body: '',
          post: props.post.id
        })
      })
      // Success alert box
      .then(() => {
        msgAlert({
          heading: 'Posted Successfully',
          message: 'Your comment has been added to the thread.',
          variant: 'success'
        })
      })
      // Refreshes PostPage component so latest comments are shown
      .then(() => {
        props.setPostPageRefresh(!props.postPageRefresh)
      })
      // Failure alert box
      .catch(() => {
        msgAlert({
          heading: 'Unable to add comment.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }

  const inputStyle = {
    width: '600px',
    maxWidth: '80vw',
    margin: '20px 0 10px',
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: '15px'
  }

  // Render form for creating a comment
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control name="body" style={inputStyle} onChange={handleInputChange} placeholder="Write a Comment..." as="textarea" rows="2" value={comment.body} required />
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default CreateCommentButton
