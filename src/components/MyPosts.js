import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Spinner from 'react-bootstrap/Spinner'

import apiUrl from '../apiConfig'
import Post from './Post'

const MyPosts = (props) => {
  const { msgAlert, user } = props
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      // topicQuery used to filter posts by topic
      url: apiUrl + '/posts'
    })
      .then(response => {
        // filters for only posts made by the current user
        const filteredPosts = [...response.data].filter(post => {
          return post.owner.id === user.id
        })
        // sorts the posts with newest first
        const sortedPosts = [...filteredPosts].sort((a, b) => {
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
  }, [])

  const loadingBoxStyle = {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center'
  }

  return (
    <div style={{ paddingBottom: '10px', paddingTop: '10px' }}>
      {!posts && <div style={loadingBoxStyle}>
        <h4>Loading Posts...</h4>
        <Spinner animation="border"/>
      </div>}
      {posts && posts.map((post) => (
        <Post key={post.id} title={post.title} owner={post.owner} body={post.body} postid={post.id} user={null} msgAlert={msgAlert} refresh={null} setRefresh={null} post={post} />
      ))}
      {posts && posts.length === 0 &&
        <h5 style={{ textAlign: 'center', marginTop: '15px' }}>You have no posts. Venture into the forum and make your first post!</h5>
      }
    </div>
  )
}

export default MyPosts
