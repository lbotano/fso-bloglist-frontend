import React, { useState } from 'react'

import loginService from '../services/login'


const login = (setUser, username, password) => {
  const user = loginService
    .login(username, password)
    .catch(error => {
      console.error(error)
    })

  console.log(user)
}

const Login = (setUser) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={event => { event.preventDefault(); login(setUser, username, password) }} >
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
  )
}

export default Login
