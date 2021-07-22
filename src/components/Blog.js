import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  
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


  return (
    <div style={boxStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShow} style={buttonStyle}>
        {show ? 'hide' : 'view'}
      </button>
      <div style={showStyle}>
        {blog.url}<br />
        likes {blog.likes} <button>like</button><br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
