import React, { useState, useEffect } from 'react'
import Post from './Post'
import CreatePostForm from './CreatePostForm'
import CreatePostButton from './CreatePostButton'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
// import Form from 'react-bootstrap/Form'

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

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <CreatePostButton handleShow={handleShow}/>
      { !posts && <h1>Loading...</h1>}
      {posts && <h1>Got some posts, one by {posts[0].owner.email}</h1>}
      { posts && posts.map(post => (
        <Post key={post.id} title={post.title} author={post.owner} body={post.body} postid={post.id} />
      ))}
      <CreatePostForm show={show} handleClose={handleClose}/>
    </div>
  )
}

export default Feed
