import React, { useState, useEffect } from 'react'
import Post from './Post'
import CreatePostForm from './CreatePostForm'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

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
  const [hoverInput, setHoverInput] = useState(false)

  const toggleHover = () => setHoverInput(!hoverInput)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const hoverStyle = {
    width: '500px',
    maxWidth: '80vw',
    margin: '20px auto',
    backgroundColor: 'rgb(255,255,255)'
  }

  const noHoverStyle = {
    width: '500px',
    maxWidth: '80vw',
    margin: '20px auto',
    backgroundColor: 'rgb(246,246,246)'
  }

  return (
    <div>
      <Form.Control style={hoverInput ? hoverStyle : noHoverStyle} placeholder="Create Post" onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={handleShow} readOnly />
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
