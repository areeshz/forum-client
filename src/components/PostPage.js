import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Spinner from 'react-bootstrap/Spinner'

import PostEdit from './PostEdit'
import CommentSection from './CommentSection'

const PostPage = (props) => {
  // Retrieves postId from redirect props
  const postId = props.routeprops.match.params.id
  // State to store post info
  const [post, setPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(0)
  const [buttonVariant, setButtonVariant] = useState('outline-primary')
  // State to determine whether component should be in 'showing' or 'editing' mode
  const [version, setVersion] = useState((props.routeprops && props.routeprops.location.state) ? props.routeprops.location.state.version : 'showing')
  // State for handling redirect to feed if the user deletes the post
  const [deleted, setDeleted] = useState(false)
  // State for refreshing the page to display latest post info (after editing)
  const [refresh, setRefresh] = useState(false)

  // Upon switching 'versions' of the component or after updating the post, retrieve latest post info to display
  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/posts/' + postId
    })
      // Set state to have the latest post info
      .then((response) => {
        const retrievedPost = response.data
        // Update the states with the post data and number of likes
        setPost(retrievedPost)
        setNumLikes(retrievedPost.liked_users.length)

        // Determine if the current user has liked the post
        let isLiked = false
        if (props.user) {
          isLiked = retrievedPost.liked_users.some((person) => {
            return person.id === props.user.id
          })
        }
        // Set the 'liked' state
        setLiked(isLiked)
        // Set the like button variant based on the liked state
        setButtonVariant(isLiked ? 'primary' : 'outline-primary')
      })
      // Failure alert box
      .catch(() => {
        props.msgAlert({
          heading: 'Unable to load post.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }, [version, refresh])

  // Handles 'delete post' request to back-end
  const deleteHandler = (event) => {
    event.stopPropagation()

    axios({
      method: 'DELETE',
      url: apiUrl + '/posts/' + post.id,
      headers: {
        Authorization: `Token ${props.user.token}`
      }
    })
      // Success alert box
      .then(() => {
        props.msgAlert({
          heading: 'Deleted Successfully',
          message: 'Your post has been removed.',
          variant: 'success'
        })
      })
      // Changes state to trigger redirect to 'Feed' upon deleting a post
      .then(() => {
        setDeleted(true)
      })
      // Failure alert box
      .catch(() => {
        props.msgAlert({
          heading: 'Delete Unsuccessful',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  // Changes component from 'showing' mode to 'editing' mode
  const editHandler = (event) => {
    event.preventDefault()

    setVersion('editing')
  }

  // Creates a 'like' connecting the user and post
  const createLike = () => {
    axios({
      method: 'POST',
      url: apiUrl + '/likes/',
      headers: {
        Authorization: `Token ${props.user.token}`
      },
      data: {
        'like': {
          'post_id': post.id
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
        props.msgAlert({
          heading: 'Like Unsuccessful',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  // Removes the 'like' connection between user and post
  const removeLike = () => {
    axios({
      method: 'DELETE',
      url: apiUrl + '/likes/',
      headers: {
        Authorization: `Token ${props.user.token}`
      },
      data: {
        post_id: post.id
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
        props.msgAlert({
          heading: 'Unable to update Like',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  const likeHandler = (event) => {
    event.stopPropagation()
    // Decides if the post should be liked or unliked
    if (liked) {
      removeLike()
    } else {
      createLike()
    }
  }

  const postBoxStyle = {
    border: '1px solid black',
    margin: '25px auto 0',
    padding: '10px',
    width: '700px',
    maxWidth: '80vw',
    borderRadius: '7px'
  }

  const titleStyle = {
    fontSize: '30px'
  }

  const bodyStyle = {
    whiteSpace: 'pre-wrap'
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

  const loadingBoxStyle = {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center'
  }

  const likeBoxStyle = {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const likeButtonStyle = {
    paddingRight: '13px',
    marginLeft: '12px'
  }

  // Renders post information  and CommentSection component if in 'showing' mode
  // Renders post edit form if in 'editing' mode
  return (
    <div>
      {!post && <div style={loadingBoxStyle}>
        <h1>Loading Post...</h1>
        <Spinner animation="border"/>
      </div>}
      {post && (version === 'showing') &&
        <div style={postBoxStyle}>
          <small style={topicStyle}>{post.topic}</small>
          <small style={authorStyle}>Posted by {post.owner.email}</small>
          { (post.created_at.slice(0, 22)) !== (post.updated_at.slice(0, 22)) && <small style={editedBadgeStyle}>(edited)</small>}
          { props.user && (props.user.id === post.owner.id) && <React.Fragment>
            <DropdownButton style={dropdownStyle} id="edit/delete dropdown" variant="outline-info" drop="down" size="sm" title="&#9776; ">
              <Dropdown.Item as="button" onClick={editHandler}>Edit</Dropdown.Item>
              <Dropdown.Item as="button" onClick={deleteHandler} style={{ color: 'red' }}>Delete</Dropdown.Item>
            </DropdownButton>
          </React.Fragment>}
          <p style={titleStyle}>{post.title}</p>
          <p style={bodyStyle}>{post.body}</p>
          <div style={likeBoxStyle}>
            <span>{numLikes} Likes</span>
            { props.user && <Button variant={buttonVariant} style={likeButtonStyle} size="sm" onClick={likeHandler}>&#x1F44D;</Button>}
          </div>
        </div>
      }
      {post && (version === 'editing') &&
        <PostEdit post={post} user={props.user} setVersion={setVersion} setPost={setPost} msgAlert={props.msgAlert} />
      }
      {deleted && <Redirect to="/feed"/>}
      {post && version === 'showing' &&
        <CommentSection post={post} msgAlert={props.msgAlert} user={props.user} postPageRefresh={refresh} setPostPageRefresh={setRefresh} />
      }
    </div>
  )
}

export default PostPage
