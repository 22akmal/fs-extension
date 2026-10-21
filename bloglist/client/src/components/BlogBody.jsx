import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';

const BlogBody = () => {
  const {blogs, isPending} = useBlogs()

  if (isPending) {
    return <h1>Loading data....</h1>
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogBody;
