import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('updates state on submit', () => {
    const expectedBlog = {
      title: 'This is a test',
      author: 'John Doe',
      url: 'https://example.com/'
    }
    const savedBlog = {}

    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector("#title")
    const author = component.container.querySelector("#author")
    const url = component.container.querySelector("#url")

    fireEvent.change(title, {
      target: { value: expectedBlog.title }
    })
    fireEvent.change(author, {
      target: { value: expectedBlog.author }
    })
    fireEvent.change(url, {
      target: { value: expectedBlog.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe(expectedBlog.title)
    expect(createBlog.mock.calls[0][1]).toBe(expectedBlog.author)
    expect(createBlog.mock.calls[0][2]).toBe(expectedBlog.url)
  })
})
