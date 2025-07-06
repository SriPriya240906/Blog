const express = require('express');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// ✅ Get all comments for a blog
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// ✅ Post a new comment (logged-in users only)
router.post('/:blogId', authMiddleware, async (req, res) => {
  const { content } = req.body;
  try {
    const newComment = new Comment({
      blog: req.params.blogId,
      user: req.user.id,
      content,
    });
    await newComment.save();
    const populated = await newComment.populate('user', 'username');
    res.status(201).json(populated);
  } catch (err) {
    console.error(' error creaing the comment:',err.message);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;