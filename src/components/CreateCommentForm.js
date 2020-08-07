import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from './../apiConfig'

const CreateCommentButton = (props) => {
  const { user, msgAlert } = props
  const [comment, setComment] = useState({
    body: '',
    post: props.post.id
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setComment({ ...comment, ...updatedField })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!user) {
      msgAlert({
        heading: 'Please sign in to comment.',
        variant: 'danger'
      })
      return
    } else if (comment.body === '') {
      return
    }

    console.log('time for axios', comment, user)

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
      .then(() => {
        setComment({
          body: '',
          post: props.post.id
        })
      })
      .then(() => {
        msgAlert({
          heading: 'Posted Successfully',
          message: 'Your comment has been added to the thread.',
          variant: 'success'
        })
      })
      .then(() => {
        props.setPostPageRefresh(!props.postPageRefresh)
      })
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

  return (
    <Form onSubmit={handleSubmit}>
      {console.log('form post info', props.post)}
      <Form.Control name="body" style={inputStyle} onChange={handleInputChange} placeholder="Write a Comment..." as="textarea" rows="2" value={comment.body} />
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default CreateCommentButton
