import {
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  Box,
  TextField
} from '@mui/material';
import { useMatch, useNavigate } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import { useContext } from 'react';
import UserContext from '../UserContext';
import { useState } from 'react';

const Blog = () => {
  const [comment, setComment] = useState("")
  const {user} = useContext(UserContext)
  const {blogs, isPending, updateBlogLike, deleteBlog, addComment} = useBlogs()
  const match = useMatch('/blogs/:id');
  const navigate = useNavigate()

  if (isPending) {
    return <h1>Loading data....</h1>
  }

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const handleDelete = (blogId, title, author) => {
    try {
      if(window.confirm(`remove blog ${title} by ${author}`)) {
        deleteBlog(blogId)
        navigate('/')
      }
    } catch (e) {
      console.error('something wrong happened')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    try {
      addComment(comment, blog.id)
      setComment('')
    } catch (e) {
      console.error('something wrong happened')
    }
  }

  if (!blog) {
    return null;
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h5" component="h2">
          {`${blog?.title}`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {`by ${blog?.author}`}
        </Typography>
        <Link href={blog?.url} target="_blank">
          {blog?.url}
        </Link>
        <Typography variant="body2" color="text.secondary">
          {`Added by ${blog?.user.name}`}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body1">{blog?.likes} likes</Typography>
          {user && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => updateBlogLike(blog)}
            >
              like
            </Button>
          )}
          {user?.username === blog?.user?.username && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(blog?.id, blog?.title, blog?.author)}
            >
              remove
            </Button>
          )}
        </Box>
        <h3>comments</h3>
        <form onSubmit={(event) => handleComment(event)}>
          <span style={{marginRight: '4px'}}>
            <TextField
              label='add a comment'
              variant='standard'
              type='text'
              value={comment}
              onChange={({target}) => setComment(target.value)}
            />
          </span>
          <Button variant="contained" style={{ marginTop: 10 }} type="submit">
            ADD COMMENT
          </Button>
        </form>
        {blog?.comments?.length > 0 ?  
          <ul>
            {blog?.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
        : <p>There's no comment</p>}
      </CardContent>
    </Card>
  );
};

export default Blog;
