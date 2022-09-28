const BlogInfo = ({ blog, handleLike, handleDelete }) => {
    const like = async (e) => {
        e.preventDefault()
        const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
        handleLike(blogToUpdate)
    }
    const del = (e) => {
        e.preventDefault()
        if(window.confirm(`Are you sure you want to delete ${blog.title}?`)){
            handleDelete(blog)
        }
    }
    return(
        <>
            <em>Url:<a>{blog.url}</a></em><br/>
            <em>Likes: {blog.likes}</em><button onClick={like}>like me!</button><br/>
            <button onClick={del}>delete</button>
        </>
    )
}
export default BlogInfo