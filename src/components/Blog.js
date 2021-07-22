import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const showStyle = { display: show ? '' : 'none' }
  const boxStyle = {
    border: '2px solid #000',
    margin: '5px 0',
    padding: '2px'
  }
  const buttonStyle = { marginLeft: 5 }

  const toggleShow = () => {
    setShow(!show)
  }

  const like = () => {
    try {
      blogService.like(blog)
      setLikes(likes + 1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={boxStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShow} style={buttonStyle}>
        {show ? 'hide' : 'view'}
      </button>
      <div style={showStyle}>
        {blog.url}<br />
        likes {likes} <button onClick={like}>like</button><br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
