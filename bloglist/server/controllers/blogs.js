const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user');
  response.status(200).json(result);
});

blogRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);
  if (result) {
    response.json(result);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    if (!request.token) {
      return response.status(401).json({ error: 'token unprovided' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const user = request.user;

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user._id,
      url: body.url,
      likes: 0,
      comments: []
    });

    const result = await blog.save();
    await blog.populate('user');
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (e) {
    console.error(e)
  }
});

blogRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment

  const result = await Blog.findById(request.params.id)
  if (!result) {
    return response.status(404).end()
  }
  
  result.comments.push(comment)

  const saveBlog = await result.save()
  await saveBlog.populate('user')
  response.json(saveBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id;
  if (!request.token) {
    return response.status(401).json({ error: 'token unprovided' });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(400).json({ error: 'blogId missing or not valid' });
  }

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(blog.id);
    await User.findByIdAndUpdate(blog.user, {
      $pull: { blogs: blog._id }
    });
    response.status(204).json(blog);
  } else {
    return response
      .status(403)
      .json({ error: 'only the creator can delete this blog' });
  }
});

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body;

  const result = await Blog.findById(request.params.id);
  if (!result) {
    return response.status(404).end();
  }

  result.user = blog.user;
  result.likes = blog.likes;
  result.author = blog.author;
  result.title = blog.title;
  result.url = blog.url;

  const saveBlog = await result.save();
  await saveBlog.populate('user');
  response.json(saveBlog);
});

module.exports = blogRouter;
