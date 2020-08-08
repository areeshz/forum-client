import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
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

  const postBoxStyle = {
    border: '1px solid black',
    width: '500px',
    margin: '20px auto 0 auto',
    padding: '10px 20px 10px 20px',
    borderRadius: '7px',
    maxWidth: '80vw',
    cursor: 'pointer'
  }

  const titleStyle = {
    fontSize: '20px',
    margin: '16px 0',
    fontWeight: '500'
  }

  const buttonStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    marginRight: '10px'
  }

  const bodyStyle = {
    whiteSpace: 'pre-wrap'
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
    <div style={postBoxStyle} onClick={handleClick}>
      <small>Posted by {props.owner.email}</small>
      { (props.post.created_at.slice(0, 22)) !== (props.post.updated_at.slice(0, 22)) && <small style={{ paddingLeft: '15px', display: 'inline-block' }}>(edited)</small>}
      { user && (user.id === props.owner.id) && <React.Fragment>
        <Button style={buttonStyle} variant="outline-warning" size="sm" onClick={editHandler}>Edit</Button>
        <Button style={buttonStyle} variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
      </React.Fragment>}
      <p style={titleStyle}>{props.title}</p>
      <p style={bodyStyle}>{props.body}</p>
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
  )
}

export default Post
