import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Duck Duck Go',
  author: 'Duck Duck Go devs',
  url: 'https://www.duckduckgo.com/',
  likes: 100,
  user: {
    username: 'lbotano',
    name: 'lau'
  }
}

const user = {
  username: 'lbotano'
}

describe('<Blog />', () => {
  test('renders blog', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} onLike={mockHandler} onRemove={mockHandler} />
    )

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)

    const togglableContent = component.container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle('display: none')
  })

  test('togglable works', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} onLike={mockHandler} onRemove={mockHandler} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    const togglableContent = component.container.querySelector('.togglableContent')
    expect(togglableContent).not.toHaveStyle('display: none')
  })
})
