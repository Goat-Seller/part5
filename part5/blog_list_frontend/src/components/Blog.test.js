import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('rendering title and author by default', () => {
    const blog = {
        title: 'Testing blog appeernace',
        author: 'Test',
        url: 'https://adasfsd.com'
    }
    render(<Blog blog = {blog}/>)

    const element = screen.getByText(`${blog.title} by ${blog.author}`)
    expect(element).toBeDefined()
})
test('renders url and likes if button clicked', async () => {
    const blog = {
        title: 'Testing blog appeernace',
        author: 'Test',
        url: 'https://adasfsd.com',
        likes: 0
    }
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const url = screen.getByText(`Url: ${blog.url}`)
    const likes = screen.getByText(`Likes: ${blog.likes}`)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})
test('clicking like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Testing blog appeernace',
        author: 'Test',
        url: 'https://adasfsd.com',
        user: {
            id: 12341244
        },
        likes: 0
    }
    const mockHandler = jest.fn()
    render(<Blog blog = { blog } handleLike = {mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const likeButton = screen.getByText('like me!')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
})