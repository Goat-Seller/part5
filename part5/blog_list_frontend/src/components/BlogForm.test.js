import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const add =jest.fn()
    const user = userEvent.setup()

    render(<BlogForm add = {add} />)

    const title =screen.getByPlaceholderText('title')
    const author =screen.getByPlaceholderText('author')
    const url =screen.getByPlaceholderText('url')
    const submit = screen.getByText('create')

    await user.type(title, 'testing form...')
    await user.type(author, 'Test')
    await user.type(url, 'https://testing.com')
    await user.click(submit)
    console.log(add.mock.calls[0][0])
    expect(add.mock.calls.length).toBe(1)
    expect(add.mock.calls[0][0]).toEqual({ title: 'testing form...', author: 'Test', url: 'https://testing.com' })
})