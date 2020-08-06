import React, { useState, useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

const Feed = (props) => {
  const [posts, setPosts] = useState(null)

  const bballpost = [
    {
      'id': 10,
      'owner': {
        'id': 1,
        'email': 'test1@test1.com'
      },
      'title': 'Who is the best player in the NBA today? (besides LeBron James and Kawhi Leonard)',
      'body': 'A long thing of text which serves as the body of this post. need more and more characters to fill this up and make it seem like theres some words in the body of this post. And again, I do wish to see how this will look if I go even further and make an even bigger text body for this post. Maybe one day this will span more than two lines. Or maybe not, or maybe more.',
      'created_at': '2020-08-05T20:38:17.454885Z',
      'updated_at': '2020-08-05T20:38:17.454914Z'
    },
    {
      'id': 11,
      'owner': {
        'id': 1,
        'email': 'test1@test1.com'
      },
      'title': 'Who is the best player in the NBA today? (besides LeBron James and Kawhi Leonard)',
      'body': 'A long thing of text which serves as the body of this post. need more and more characters to fill this up and make it seem like theres some words in the body of this post. And again, I do wish to see how this will look if I go even further and make an even bigger text body for this post. Maybe one day this will span more than two lines. Or maybe not, or maybe more.',
      'created_at': '2020-08-05T20:38:17.454885Z',
      'updated_at': '2020-08-05T20:38:17.454914Z'
    },
    {
      'id': 12,
      'owner': {
        'id': 1,
        'email': 'test1@test1.com'
      },
      'title': 'Who is the best player in the NBA today? (besides LeBron James and Kawhi Leonard)',
      'body': 'A long thing of text which serves as the body of this post. need more and more characters to fill this up and make it seem like theres some words in the body of this post. And again, I do wish to see how this will look if I go even further and make an even bigger text body for this post. Maybe one day this will span more than two lines. Or maybe not, or maybe more.',
      'created_at': '2020-08-05T20:38:17.454885Z',
      'updated_at': '2020-08-05T20:38:17.454914Z'
    },
    {
      'id': 13,
      'owner': {
        'id': 1,
        'email': 'test1@test1.com'
      },
      'title': 'Who is the best player in the NBA today? (besides LeBron James and Kawhi Leonard)',
      'body': 'A long thing of text which serves as the body of this post. need more and more characters to fill this up and make it seem like theres some words in the body of this post. And again, I do wish to see how this will look if I go even further and make an even bigger text body for this post. Maybe one day this will span more than two lines. Or maybe not, or maybe more.',
      'created_at': '2020-08-05T20:38:17.454885Z',
      'updated_at': '2020-08-05T20:38:17.454914Z'
    }
  ]
  console.log(bballpost)

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
