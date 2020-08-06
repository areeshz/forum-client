import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

import PostEdit from './PostEdit'

const PostPage = (props) => {
  const postId = props.routeprops.match.params.id
  const [post, setPost] = useState(null)
  const [version, setVersion] = useState((props.routeprops && props.routeprops.location.state) ? props.routeprops.location.state.version : 'showing')
  console.log(setVersion)

  useEffect(() => {
    console.log('props are', props)
    axios({
      method: 'GET',
      url: apiUrl + '/feed/' + postId
    })
      .then((response) => {
        setPost(response.data)
      })
      .catch(console.error)
  }, [])

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
        <p style={titleStyle}>{post.title}</p>
        <p style={bodyStyle}>{post.body}</p>
      </div>}
      {post && (version === 'editing') && <PostEdit title={post.title} body={post.body} user={props.user} />}
    </div>
  )
}

export default PostPage
