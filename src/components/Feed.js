import React, { useState, useEffect } from 'react'
import Post from './Post'
import CreatePostForm from './CreatePostForm'
import CreatePostButton from './CreatePostButton'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

import Spinner from 'react-bootstrap/Spinner'

const Feed = (props) => {
  console.log('props are', props)
  const { msgAlert, topic } = props
  const [posts, setPosts] = useState(null)
  const [refresh, setRefresh] = useState(false)

  let title = ''
  let description = ''
  // If a 'topic' prop is passed, generate a query to be added to the apiUrl to filter posts by topic, and set the heading title and description to correspond
  const topicQuery = (function (topic) {
    const query = '?topic='
    switch (topic) {
    case 'General':
      title = 'General'
      description = 'Post here about any topic your heart desires!'
      return query + 'General'
    case 'Sports':
      title = 'Sports'
      description = 'NBA, NFL, or even Curling, any sports talk is welcome!'
      return query + 'Sports'
    case 'Advice':
      title = 'Advice'
      description = 'Ask for or give advice.'
      return query + 'Advice'
    case 'Pets':
      title = 'Pets'
      description = 'All things pet-related live here.'
      return query + 'Pets'
    case 'Movies TV':
      title = 'Movies / TV'
      description = 'Discuss your favorite movies and tv shows or find new ones to watch!'
      return query + 'Movies%20/%20TV'
    case 'Books':
      title = 'Books'
      description = 'Look for book recommendations or discuss the ones you\'re reading!'
      return query + 'Books'
    case 'Current Events':
      title = 'Current Events'
      description = 'A place to discuss the latest news.'
      return query + 'Current%20Events'
    default:
      title = 'All Posts'
      description = 'See all the posts our forum has to offer! You can also filter by topic on the Navbar above!'
      return ''
    }
  })(topic)
  console.log(topicQuery)

  // To be run upon  mount and upon closing of 'create post' modal
  // Grabs the latest list of posts from the server and saves them in the state
  useEffect(() => {
    // Set the 'posts' state to null to trigger the loading message
    setPosts(null)
    axios({
      method: 'GET',
      // topicQuery used to filter posts by topic
      url: apiUrl + '/posts' + topicQuery
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
  }, [refresh, props])

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

  const headingStyle = {
    width: '500px',
    maxWidth: '80vw',
    margin: '20px auto'
  }

  const loadingBoxStyle = {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center'
  }

  // Renders each post from the server, and the create post button and modal
  return (
    <div style={{ paddingBottom: '10px' }}>
      <div style={headingStyle}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      { !posts && <div style={loadingBoxStyle}>
        <h1>Loading Feed...</h1>
        <Spinner animation="border"/>
      </div>}
      { posts && <React.Fragment>
        <CreatePostButton handleShow={handleShow}/>
        {posts.map(post => (
          <Post key={post.id} title={post.title} owner={post.owner} body={post.body} postid={post.id} user={props.user} msgAlert={msgAlert} refresh={refresh} setRefresh={setRefresh} post={post} />
        ))}
      </React.Fragment>}
      { /* Add 'no posts' message if no posts in given topic */}
      {posts && posts.length === 0 &&
        <React.Fragment>
          <br />
          <h2 style={{ textAlign: 'center' }}>No posts for this topic. You can be the first!</h2>
        </React.Fragment>
      }
      <CreatePostForm show={show} handleClose={handleClose} token={props.token} setRefresh={setRefresh} refresh={refresh} msgAlert={msgAlert}/>
    </div>
  )
}

export default Feed
