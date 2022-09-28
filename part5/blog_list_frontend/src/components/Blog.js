import { useState } from 'react'
import BlogInfo from './BlogInfo'

const Blog = ({ blog, handleLike , handleDelete }) => {
    const [click, setClick] = useState()
    return (
        <>
            <li className='blog' ><>{blog.title} by {blog.author}</>
                <button onClick={() => setClick(!click)}>{click ? 'hide': 'show'}</button>
                {click ? <BlogInfo blog={blog} handleLike={handleLike} handleDelete={handleDelete} /> : ''}
            </li>
        </>
    )
}
export default Blog