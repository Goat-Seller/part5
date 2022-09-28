import Blog from './Blog'
const Blogs = (params) => {
    return (
        <div>
            <h2>Blogs on website</h2>
            <ul>
                {params.blogs.map((blog) => <Blog key={blog.id} blog={blog} handleLike={params.handleLike} handleDelete={params.handleDelete} /> )}
            </ul>
        </div>
    )
}
export default Blogs