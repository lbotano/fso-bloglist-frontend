import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  blog.likes++

  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    _id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user.id
  }, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  create,
  like,
  remove
}
