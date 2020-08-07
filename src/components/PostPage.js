import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

import PostEdit from './PostEdit'

const PostPage = (props) => {
  const postId = props.routeprops.match.params.id
  const [post, setPost] = useState(null)
  const [version, setVersion] = useState((props.routeprops && props.routeprops.location.state) ? props.routeprops.location.state.version : 'showing')

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

  return (
    <div>
      {!post && <h1>Loading...</h1>}
      {post && (version === 'showing') && <div style={postBoxStyle}>
        <small>Posted by {post.owner.email}</small>
        { (post.created_at.slice(0, 22)) !== (post.updated_at.slice(0, 22)) && <small style={{ paddingLeft: '15px', display: 'inline-block' }}>(edited)</small>}
        <p style={titleStyle}>{post.title}</p>
        <p style={bodyStyle}>{post.body}</p>
      </div>}
      {post && (version === 'editing') && <PostEdit post={post} user={props.user} setVersion={setVersion} setPost={setPost} msgAlert={props.msgAlert} />}
    </div>
  )
}

export default PostPage
