import { useState, useEffect, useRef } from 'react'

import blogsService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [message, setMessage] = useState('')
    const[className, setClassName] = useState('')

    const [user,setUser] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogsService
            .getAll()
            .then(currentBlogs => setBlogs(currentBlogs.sort((a, b) => b.likes - a.likes)))
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogsService.setToken(user.token)
        }
    },[])
    const handleLike = async (uBlog) => {
        const updatedBlog = await blogsService.update(uBlog.id, uBlog)
        setBlogs(blogs.map(blog => blog.id !== uBlog.id ? blog : updatedBlog))
        return updatedBlog
    }

    const handleLogout = async (event) => {
        try {
            event.preventDefault()
            window.localStorage.removeItem('loggedBlogAppUser')
            setUser(null)
            setClassName('success')
            setMessage('User successfully logged out')
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        } catch (exception) {
            console.log(exception)
            setClassName('fail')
            setMessage('something went wrong')
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        }
    }

    const createToken = async (username, password) => {
        try {
            const user = await loginService.login({ username, password, })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogsService.setToken(user.token)
            setUser(user)
            setClassName('success')
            setMessage(`User ${username} successfully logged in`)
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        }
        catch (exception) {
            console.log(exception)
            setClassName('fail')
            setMessage('wrong username or pasword')
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        }
    }
    const handleBlogAdd = async (blogObject) => {
        try {
            const newBlog = await blogsService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            blogFormRef.current.toggleVisibility()
            setClassName('success')
            setMessage(`A new blog:  ${blogObject.title}, by ${blogObject.author} was added`)
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        } catch (exception) {
            console.log(exception)
            setClassName('fail')
            setMessage('All data required!')
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        }
    }
    const handleDelete = async (blog) => {
        try {
            await blogsService.del(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id ? b : ''))
            setClassName('success')
            setMessage(`${blog.title} was succesfuly deleted`)
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        } catch (exception) {
            console.log(exception)
            setClassName('fail')
            setMessage('You are not the owner of blog')
            setTimeout(() => setMessage(null), 5000)
            setTimeout(() => setClassName(null), 5000)
        }
    }
    return (
        <div>
            {message ==='' ? null :<Notification message={message} className={className}/>}
            {user === null
                ? <Togglable buttonLabel='log in' ><LoginForm token={createToken} /></Togglable>
                : <div>
                    <p><b>{user.name}</b> logged in <button onClick={handleLogout}>Logout</button></p>
                    <Togglable buttonLabel='create blog' ref={blogFormRef} ><BlogForm add={handleBlogAdd} /></Togglable>
                </div>
            }
            <div>
                <ul className="ul">
                    <Blogs blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} />
                </ul>
            </div>
        </div>
    )
}

export default App