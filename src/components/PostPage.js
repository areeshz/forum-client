import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import Button from 'react-bootstrap/Button'

import PostEdit from './PostEdit'

const PostPage = (props) => {
  const postId = props.routeprops.match.params.id
  const [post, setPost] = useState(null)
  const [version, setVersion] = useState((props.routeprops && props.routeprops.location.state) ? props.routeprops.location.state.version : 'showing')
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    console.log('props are', props)
    axios({
      method: 'GET',
      url: apiUrl + '/feed/' + postId
    })
      .then((response) => {
        setPost(response.data)
      })
      .catch(() => {
        props.msgAlert({
          heading: 'Unable to load post.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }, [version])

  const deleteHandler = (event) => {
    event.stopPropagation()

    axios({
      method: 'DELETE',
      url: apiUrl + '/posts/' + post.id,
      headers: {
        Authorization: `Token ${props.user.token}`
      }
    })
      .then(() => {
        props.msgAlert({
          heading: 'Deleted Successfully',
          message: 'Your post has been removed.',
          variant: 'success'
        })
      })
      .then(() => {
        setDeleted(true)
      })
      .catch(() => {
        props.msgAlert({
          heading: 'Delete Unsuccessful',
          message: 'Something went wrong. Please try again later.',
          variant: 'danger'
        })
      })
  }

  const editHandler = (event) => {
    event.preventDefault()

    setVersion('editing')
  }

  const postBoxStyle = {
    border: '1px solid black',
    marginTop: '25px',
    padding: '10px'
  }

  const titleStyle = {
    fontSize: '30px'
  }

  const bodyStyle = {
    whiteSpace: 'pre-wrap'
  }

  const buttonStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    marginRight: '10px'
  }

  return (
    <div>
      {!post && <h1>Loading...</h1>}
      {post && (version === 'showing') && <div style={postBoxStyle}>
        <small>Posted by {post.owner.email}</small>
        { (post.created_at.slice(0, 22)) !== (post.updated_at.slice(0, 22)) && <small style={{ paddingLeft: '15px', display: 'inline-block' }}>(edited)</small>}
        { props.user && (props.user.id === post.owner.id) && <React.Fragment>
          <Button style={buttonStyle} variant="outline-warning" size="sm" onClick={editHandler}>Edit</Button>
          <Button style={buttonStyle} variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
        </React.Fragment>}
        <p style={titleStyle}>{post.title}</p>
        <p style={bodyStyle}>{post.body}</p>
      </div>}
      {post && (version === 'editing') && <PostEdit post={post} user={props.user} setVersion={setVersion} setPost={setPost} msgAlert={props.msgAlert} />}
      {deleted && <Redirect to="/feed"/>}
    </div>
  )
}

export default PostPage
