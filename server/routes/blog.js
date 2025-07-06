const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); 
const authMiddleware = require('../middleware/auth'); // Ensure only this one is used

// ✅ Create a new blog (requires login)
router.post('/',authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id, // author from JWT
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created', blog: newBlog });
  } catch (error) {
    console.error("❌ Blog creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single blog by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author','username');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('❌ Error fetching blog by ID:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Like a blog post (public)
router.post('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.likes += 1;
    await blog.save();

    res.json({ message: 'Blog liked', likes: blog.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete blog (only if logged in user is the author)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Update blog post by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // check if user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    // update fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('❌ Update error:', err.message);
    res.status(500).json({ message: 'Server error while updating blog' });
  }
});

module.exports = router;