const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes=require('./routes/comments');
const blogRoutes = require('./routes/blog');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Optional: add default route
app.get('/', (req, res) => {
  res.send('API is running. Use /api/posts or /api/auth');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/blogs',blogRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'blogdb' })
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('🚀 Server started on port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
