import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Duck Duck Go',
  author: 'Duck Duck Go devs',
  url: 'https://www.duckduckgo.com/',
  user: {
    username: 'lbotano',
    name: 'lau'
  }
}

const user = {
  username: 'lbotano'
}

test('renders blog', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} onLike={mockHandler} onRemove={mockHandler} />
  )

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)

  const togglableContent = component.container.querySelector('.togglableContent')
  expect(togglableContent).toHaveStyle('display: none')
})
