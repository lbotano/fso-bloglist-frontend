import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login(username, password)

      if (user.status === 200) {
        setUser(user.data)
      }

      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user.data))
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        alert('Wrong username or password')
      }
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={event => { event.preventDefault(); login(username, password) }} >
        username
        <input
          type="test"
          value={username}
          onChange={event => setUsername(event.target.value)} />
        <br />
        password
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)} />
        <br />
        <input type="submit" />
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in<button onClick={logout}>logout</button></div><br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <>
      { user === null ? loginForm() : blogForm() }
    </>
  )
}

export default App
