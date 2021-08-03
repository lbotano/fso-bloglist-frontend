import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(
      blogTitle,
      author,
      url
    )
    setBlogTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      title:
      <input
        id="title"
        type="text"
        value={blogTitle}
        onChange={ event => setBlogTitle(event.target.value) } /><br />
      author:
      <input
        id="author"
        type="text"
        value={author}
        onChange={ event => setAuthor(event.target.value) } /><br />
      url:
      <input
        id="url"
        type="text"
        value={url}
        onChange={ event => setUrl(event.target.value) } /><br />
      <input id="submit" type="submit" value="create" />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
