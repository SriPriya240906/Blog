import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; // already imported

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/home');
    } catch (err) {
      console.error('❌ Error creating post:', err.response?.data || err.message);
    }
  };

  return (
    <div className="create-post-container">
      <div className="go-back-wrapper">
        <button className="go-back-button" onClick={() => navigate('/home')}>
          ← Go Back to Blogs
        </button>
      </div>

      <h2 className="create-post-title">📝 Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
          required
        ></textarea>
        <button type="submit" className="submit-button">
          📤 Submit Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;