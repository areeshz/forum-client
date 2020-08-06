import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

const CreatePostButton = (props) => {
  const [hoverInput, setHoverInput] = useState(false)

  const toggleHover = () => setHoverInput(!hoverInput)

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
    <Form.Control style={hoverInput ? hoverStyle : noHoverStyle} placeholder="Create Post" onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={props.handleShow} readOnly />
  )
}

export default CreatePostButton
