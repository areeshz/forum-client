import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

const CreatePostButton = (props) => {
  // State and toggle for switching styles when user hovers over input
  const [hoverInput, setHoverInput] = useState(false)
  const toggleHover = () => setHoverInput(!hoverInput)

  // Styles to be applied when mouse hovers over the input
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
    backgroundColor: 'rgb(249,249,249)'
  }

  // Renders readonly input that opens CreatePostForm component modal when clicked
  return (
    <Form.Control style={hoverInput ? hoverStyle : noHoverStyle} placeholder="Create Post" onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={props.handleShow} readOnly />
  )
}

export default CreatePostButton
