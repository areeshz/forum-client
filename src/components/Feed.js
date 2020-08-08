import React, { useState, useEffect } from 'react'
import Post from './Post'
import CreatePostForm from './CreatePostForm'
import CreatePostButton from './CreatePostButton'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const Feed = (props) => {
  const { msgAlert } = props
  const [posts, setPosts] = useState(null)
  const [refresh, setRefresh] = useState(false)

  // To be run upon  mount and upon closing of 'create post' modal
  // Grabs the latest list of posts from the server and saves them in the state
  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/posts'
    })
      .then(response => {
        // sorts the posts with newest first
        const sortedPosts = [...response.data].sort((a, b) => {
          return b.id - a.id
        })
        setPosts(sortedPosts)
      })
      // Failure alert box for when posts cannot be fetched
      .catch(() => {
        msgAlert({
          heading: 'Unable to load posts.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }, [refresh])

  // State for handling the view status of the 'create post' modal
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  // Changes state to show the 'create post' modal if the user is signed in
  // Shows failure alert if user is not signed in and tries to create a post
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

  // Renders each post from the server, and the create post button and modal
  return (
    <div>
      { !posts && <h1 style={{ textAlign: 'center' }}>Loading Feed...</h1>}
      { posts && <React.Fragment>
        <CreatePostButton handleShow={handleShow}/>
        {posts.map(post => (
          <Post key={post.id} title={post.title} owner={post.owner} body={post.body} postid={post.id} user={props.user} msgAlert={msgAlert} refresh={refresh} setRefresh={setRefresh} post={post} />
        ))}
      </React.Fragment>}
      <CreatePostForm show={show} handleClose={handleClose} token={props.token} setRefresh={setRefresh} refresh={refresh} msgAlert={msgAlert}/>
    </div>
  )
}

export default Feed
