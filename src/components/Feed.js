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
  const { msgAlert } = props
  const [posts, setPosts] = useState(null)
  const [refresh, setRefresh] = useState(false)

  // // To be run upon component mounting
  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: apiUrl + '/feed'
  //   })
  //     .then(response => {
  //       setPosts(response.data)
  //     })
  //     .catch(console.error)
  // }, [])

  // To be run upon  mount and upon closing of 'create post' modal
  useEffect(() => {
    console.log('CHANGE')
    axios({
      method: 'GET',
      url: apiUrl + '/feed'
    })
      .then(response => {
        setPosts(response.data.reverse())
      })
      .catch(console.error)
  }, [refresh])

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    if (props.token) {
      setShow(true)
    } else {
      msgAlert({
        heading: 'Not Signed In',
        message: 'Please sign in to create a post.',
        variant: 'danger'
      })
    }
  }

  return (
    <div>
      <CreatePostButton handleShow={handleShow}/>
      { !posts && <h1>Loading...</h1>}
      {posts && <h1>Got some posts, one by {posts[0].owner.email}</h1>}
      { posts && posts.map(post => (
        <Post key={post.id} title={post.title} author={post.owner} body={post.body} postid={post.id} />
      ))}
      <CreatePostForm show={show} handleClose={handleClose} token={props.token} setRefresh={setRefresh} refresh={refresh} msgAlert={msgAlert}/>
    </div>
  )
}

export default Feed
