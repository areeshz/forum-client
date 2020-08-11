import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const Post = (props) => {
  const { user, msgAlert } = props
  // States for determining if a user should be directed to the PostPage in showing mode or editing mode
  const [show, setShow] = useState(null)
  const [edit, setEdit] = useState(null)
  const [liked, setLiked] = useState(props.liked)
  const [numLikes, setNumLikes] = useState(props.post.liked_users.length)
  const [buttonVariant, setButtonVariant] = useState(props.liked ? 'primary' : 'outline-primary')

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
    textDecoration: 'underline',
    marginBottom: '0'
  }

  const messageNoHoverStyle = {
    fontWeight: '400',
    marginBottom: '0'
  }

  const postBoxStyle = {
    border: '1px solid black',
    width: '500px',
    margin: '20px auto 0 auto',
    padding: '10px 20px 15px 20px',
    borderRadius: '7px',
    maxWidth: '80vw'
  }

  const clickableDivStyle = {
    cursor: 'pointer'
  }

  const titleStyle = {
    fontSize: '20px',
    margin: '10px 0',
    fontWeight: '500'
  }

  const titleHoverStyle = {
    fontSize: '20px',
    margin: '10px 0',
    fontWeight: '500',
    textDecoration: 'underline'
  }

  const bodyStyle = {
    whiteSpace: 'pre-wrap',
    marginBottom: '0'
  }

  const dropdownStyle = {
    display: 'inline-block',
    float: 'right'
  }

  const topicStyle = {
    display: 'inline-block',
    marginRight: '15px',
    fontWeight: '600'
  }

  const authorStyle = {
    wordBreak: 'break-all',
    color: '#787C7E'
  }

  const editedBadgeStyle = {
    paddingLeft: '15px',
    display: 'inline-block',
    color: '#787C7E'
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

  const createLike = () => {
    axios({
      method: 'POST',
      url: apiUrl + '/likes/',
      headers: {
        Authorization: `Token ${user.token}`
      },
      data: {
        'like': {
          'post_id': props.post.id
        }
      }
    })
      // On success, update the liked state, like counter, and like button style
      .then(() => {
        setLiked(true)
        setNumLikes(numLikes + 1)
        setButtonVariant('primary')
      })
      // Failure alert box
      .catch(() => {
        msgAlert({
          heading: 'Like Unsuccessful',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  const removeLike = () => {
    axios({
      method: 'DELETE',
      url: apiUrl + '/likes/',
      headers: {
        Authorization: `Token ${user.token}`
      },
      data: {
        post_id: props.post.id
      }
    })
      // On success, update the liked state, like counter, and like button style
      .then((response) => {
        setLiked(false)
        setNumLikes(numLikes - 1)
        setButtonVariant('outline-primary')
      })
      // Failure alert box
      .catch(() => {
        msgAlert({
          heading: 'Unable to update Like',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  const likeHandler = (event) => {
    event.stopPropagation()

    console.log('trying to like this post!')
    if (liked) {
      removeLike()
    } else {
      createLike()
    }
  }

  // Renders post info (author, edit status, title, body)
  // Renders edit and delete buttons if user is the owner of the post
  // Sets up redirects to the PostPage component / route for 'showing mode' and 'editing mode'
  return (
    <div>
      <div style={postBoxStyle}>
        <small style={topicStyle}>{props.post.topic}</small>
        <small style={authorStyle}>Posted by {props.owner.email}</small>
        { (props.post.created_at.slice(0, 22)) !== (props.post.updated_at.slice(0, 22)) && <small style={editedBadgeStyle}>(edited)</small>}
        { user && (user.id === props.owner.id) && <React.Fragment>
          <DropdownButton style={dropdownStyle} id="edit/delete dropdown" variant="outline-info" drop="down" size="sm" title="&#9776; ">
            <Dropdown.Item as="button" onClick={editHandler}>Edit</Dropdown.Item>
            <Dropdown.Item as="button" onClick={deleteHandler} style={{ color: 'red' }}>Delete</Dropdown.Item>
          </DropdownButton>
        </React.Fragment>}
        <div onClick={handleClick} style={clickableDivStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <p style={hover ? titleHoverStyle : titleStyle}>{props.title}</p>
          <p style={bodyStyle}>{postBody}<span style={{ fontWeight: '9' }}>{ellipses}</span></p>
          { readMoreMessage && <p style={hover ? messageHoverStyle : messageNoHoverStyle}>{readMoreMessage}</p>}
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
        <p>{numLikes} Likes</p>
        { user && <Button variant={buttonVariant} onClick={likeHandler}>{liked ? 'Unlike' : 'Like'} &#x1F44D;</Button>}
      </div>
    </div>
  )
}

export default Post
