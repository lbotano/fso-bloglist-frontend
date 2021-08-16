import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, user, onLike, onRemove }) => {
  const [show, setShow] = useState(false)

  const showStyle = { display: show ? '' : 'none' }
  const removeStyle = { display: user.username === blog.user.username ? '' : 'none' }
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
      onLike(blog)
    } catch (error) {
      console.error(error)
    }
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.remove(blog)
        onRemove(blog)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div style={boxStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShow} style={buttonStyle}>
        {show ? 'hide' : 'view'}
      </button>
      <div style={showStyle} className="togglableContent">
        {blog.url}<br />
        likes <span className="likes">{blog.likes}</span>
        <button onClick={like}>like</button><br />
        {blog.user.name}<br />
        <button onClick={remove} style={removeStyle}>remove</button>
      </div>
    </div>
  )
}

export default Blog
