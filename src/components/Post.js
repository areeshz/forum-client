import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const Post = (props) => {
  const { user, msgAlert } = props
  // States for determining if a user should be directed to the PostPage in showing mode or editing mode
  const [show, setShow] = useState(null)
  const [edit, setEdit] = useState(null)

  // Sends user to the PostPage in showing mode
  const handleClick = () => {
    setShow(true)
  }

  // Define values for body of post, and other variables for truncating the post
  let postBody = props.body
  let ellipses = ''
  let readMoreMessage = ''

  // If the post body is sufficiently long, truncate it, add ellipses, and add a 'read more' message
  if (props.body.length > 375) {
    postBody = props.body.slice(0, 375)
    ellipses = '...'
    readMoreMessage = '(Read More)'
  }

  const [hover, setHover] = useState(false)

  const toggleHover = () => setHover(!hover)

  const messageHoverStyle = {
    fontWeight: '500',
    textDecoration: 'underline'
  }

  const messageNoHoverStyle = {
    fontWeight: '400'
  }

  const postBoxStyle = {
    border: '1px solid black',
    width: '500px',
    margin: '20px auto 0 auto',
    padding: '10px 20px 10px 20px',
    borderRadius: '7px',
    maxWidth: '80vw'
  }

  const clickableDivStyle = {
    cursor: 'pointer'
  }

  const titleStyle = {
    fontSize: '20px',
    margin: '16px 0',
    fontWeight: '500'
  }

  const titleHoverStyle = {
    fontSize: '20px',
    margin: '16px 0',
    fontWeight: '500',
    textDecoration: 'underline'
  }

  const bodyStyle = {
    whiteSpace: 'pre-wrap'
  }

  const dropdownStyle = {
    display: 'inline-block',
    float: 'right'
  }

  // Handles 'delete post' request to back-end
  const deleteHandler = (event) => {
    event.stopPropagation()

    axios({
      method: 'DELETE',
      url: apiUrl + '/posts/' + props.postid,
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
      // Success alert box
      .then(() => {
        msgAlert({
          heading: 'Deleted Successfully',
          message: 'Your post has been removed.',
          variant: 'success'
        })
        props.setRefresh(!props.refresh)
      })
      // Failure alert box
      .catch(() => {
        msgAlert({
          heading: 'Delete Unsuccessful',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  // Sends user to the PostPage in editing mode
  const editHandler = (event) => {
    event.stopPropagation()

    setEdit(true)
  }

  // Renders post info (author, edit status, title, body)
  // Renders edit and delete buttons if user is the owner of the post
  // Sets up redirects to the PostPage component / route for 'showing mode' and 'editing mode'
  return (
    <div>
      <div style={postBoxStyle}>
        <small style={{ wordBreak: 'break-all' }}>Posted by {props.owner.email}</small>
        { (props.post.created_at.slice(0, 22)) !== (props.post.updated_at.slice(0, 22)) && <small style={{ paddingLeft: '15px', display: 'inline-block' }}>(edited)</small>}
        { user && (user.id === props.owner.id) && <React.Fragment>
          <DropdownButton style={dropdownStyle} id="edit/delete dropdown" variant="outline-info" drop="down" size="sm" title="&#9776; ">
            <Dropdown.Item as="button" onClick={editHandler}>Edit</Dropdown.Item>
            <Dropdown.Item as="button" onClick={deleteHandler} style={{ color: 'red' }}>Delete</Dropdown.Item>
          </DropdownButton>
        </React.Fragment>}
        <div onClick={handleClick} style={clickableDivStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <p style={hover ? titleHoverStyle : titleStyle}>{props.title}</p>
          <p style={bodyStyle}>{postBody}<span style={{ fontWeight: '9' }}>{ellipses}</span></p>
          <p style={hover ? messageHoverStyle : messageNoHoverStyle}>{readMoreMessage}</p>
          { show && <Redirect to={{
            pathname: `/posts/${props.postid}`,
            state: {
              version: 'showing'
            }
          }}
          />}
          { edit && <Redirect to={{
            pathname: `/posts/${props.postid}`,
            state: {
              version: 'editing'
            }
          }}
          />}
        </div>
      </div>
    </div>
  )
}

export default Post
