const usersRouter = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({
        error: 'the length of password and username must be at least 3',
      });
  }

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs');
  response.status(200).json(result);
});

usersRouter.get('/sync-user', async (request, response) => {
  try {
    const users = await User.find({})

    for (let user of users) {
      const userBlogs = await Blog.find({user: user._id})

      const blogIds = userBlogs.map(blog => blog.id)

      user.blogs = blogIds
      await user.save()
    }
    response.status(200).json({ message: 'Sinkronisasi berhasil! Semua array blogs user telah dibersihkan.' })
  } catch (e) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = usersRouter;
