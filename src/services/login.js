import axios from 'axios'

const baseUrl = '/api/login'

const login = (username, password) =>
  axios.post(baseUrl, { username: username, password: password })

export default {
  login
}
