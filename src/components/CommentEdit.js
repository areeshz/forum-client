import React from 'react'

// import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CommentEdit = (props) => {
  const { updatedComment, setUpdatedComment, cancelEdit } = props

  const handleInputChange = (event) => {
    event.preventDefault()
    const updatedField = { [event.target.name]: event.target.value }
    setUpdatedComment({ ...updatedComment, ...updatedField })
  }

  const formStyle = {
    marginTop: '12px'
  }

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }

  const cancelButtonStyle = {
    marginBottom: '10px'
  }

  return (
    <Form onSubmit={props.submitHandler} style={formStyle}>
      <Row>
        <Col>
          <Form.Control as="textarea" rows="3" name="body" placeholder="Update Comment..." value={updatedComment.body} onChange={handleInputChange} required/>
        </Col>
        <Col xs="auto" style={buttonContainerStyle}>
          <Button variant="secondary" style={cancelButtonStyle} onClick={cancelEdit}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CommentEdit
