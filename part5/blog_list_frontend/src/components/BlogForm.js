import { useState } from 'react'

const BlogForm = ({ add }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (e) => {
        e.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
        }
        add(blogObject)
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return(
        <div>
            <form onSubmit={addBlog}>
                <div>
                    <label>title: </label><input id='title' type='text' placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    <label>author: </label><input id='author' type='text' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    <label>url: </label><input id='url' type='text' placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button id='create' type="Submit">create</button>
            </form>
        </div>
    )
}
export default BlogForm