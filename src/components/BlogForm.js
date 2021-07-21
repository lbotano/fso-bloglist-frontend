import React, { useState } from 'react'

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
        type="text"
        value={blogTitle}
        onChange={ event => setBlogTitle(event.target.value) } /><br />
      author:
      <input
        type="text"
        value={author}
        onChange={ event => setAuthor(event.target.value) } /><br />
      url:
      <input
        type="text"
        value={url}
        onChange={ event => setUrl(event.target.value) } /><br />
      <input type="submit" value="create" />
    </form>
  )
}

export default BlogForm
