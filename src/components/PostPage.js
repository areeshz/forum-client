import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const PostPage = (props) => {
  const postId = props.routeprops.match.params.id
  const [post, setPost] = useState(null)

  useEffect(() => {
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
    color: 'black'
  }

  return (
    <div>
      {!post && <h1>Loading...</h1>}
      {post && <div style={postBoxStyle}>
        <small>Posted by {post.owner.email}</small>
        <p style={titleStyle}>{post.title}</p>
        <p style={bodyStyle}>{post.body}</p>
      </div>}
    </div>
  )
}

export default PostPage
