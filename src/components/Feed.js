import React, { useState, useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const Feed = (props) => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/feed'
    })
      .then(response => {
        console.log('response is', response)
        setPosts(response.data)
      })
      .catch(console.error)
  }, [])

  return (
    <div>
      { !posts && <h1>Loading...</h1>}
      {posts && <h1>Got some posts, one by {posts[0].owner.email}</h1>}
      { posts && posts.map(post => (
        <Post key={post.id} title={post.title} author={post.owner} body={post.body} postid={post.id} />
      ))}
    </div>
  )
}

export default Feed
