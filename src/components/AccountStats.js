import React, { useState, useEffect } from 'react'
import axios from 'axios'

import apiUrl from '../apiConfig'

const AccountStats = (props) => {
  const { msgAlert, user } = props
  const [stats, setStats] = useState(null)

  const calculateStats = (posts) => {
    let numPosts = 0
    let numPostComments = 0
    let numComments = 0
    posts.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.owner.id === user.id) {
          numComments++
        } else if (post.owner.id === user.id) {
          numPostComments++
        }
      })
      if (post.owner.id === user.id) {
        numPosts++
      }
    })
    setStats({
      posts: numPosts,
      comments: numComments,
      postComments: numPostComments
    })
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/posts'
    })
      .then((response) => {
        calculateStats(response.data)
      })
      .catch(() => {
        msgAlert({
          heading: 'Unable to load posts.',
          message: 'Something went wrong, please try again later.',
          variant: 'danger'
        })
      })
  }, [])

  const statBoxStyles = {
    width: '350px',
    margin: '0 auto'
  }

  const headingStyles = {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '10px'
  }

  const itemStyles = {
    marginBottom: '7px'
  }

  return (
    <div style={statBoxStyles}>
      { stats && <div>
        <h4 style={headingStyles}>Statistics</h4>
        <ul>
          <li style={itemStyles}>{stats.posts} Posts Authored</li>
          <li style={itemStyles}>{stats.comments} Comments Written</li>
          <li style={itemStyles}>{stats.postComments} Comments by Others on Your Posts</li>
        </ul>
      </div>
      }
    </div>
  )
}

export default AccountStats
