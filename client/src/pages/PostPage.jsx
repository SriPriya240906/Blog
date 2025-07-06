import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostPage.css';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('❌ Error fetching post:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("❌ Error fetching comments:", err.message);
      }
    };

    const decodeToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (e) {
        console.error('❌ Invalid token');
      }
    };

    fetchPost();
    fetchComments();
    decodeToken();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/blogs/${id}/like`);
      setPost({ ...post, likes: res.data.likes });
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post deleted');
      navigate('/home');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`
        http://localhost:5000/api/comments/${id}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setComments([res.data, ...comments]);
      setComment('');
    } catch (err) {
      console.error("❌ Failed to add comment:", err.message);
    }
  };

  if (loading || !post)
    return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="post-container">
      <div className="outer-box">
        <div className="post-header-controls">
          <button onClick={() => navigate('/home')} className="button back-button">
            ← Go Back to Blogs
          </button>

          {currentUserId && post.author && currentUserId === post.author._id && (
            <div className="flex flex-col items-end">
              <button
                onClick={() => navigate(`/edit/${id}`)}
                className="button edit-button"
              >
                ✏ Edit
              </button>
              <button
                onClick={handleDelete}
                className="button delete-button"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>

        {/* Inner Box: Blog Title & Content */}
        <div className="inner-box">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-meta">
            ✍ {post.author?.username || 'Unknown'} | 🕒{' '}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="post-content">{post.content}</div>
        </div>
      </div>

      {/* Like Button placed outside both boxes */}
      <button onClick={handleLike} className="like-button">
        🔥 Like ({post.likes || 0})
      </button>

      {/* Comments Section */}
      <div className="comment-section">
        <h3 className="comment-title">💬 Leave a Comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="comment-box"
          rows={3}
        />
        <button onClick={handleAddComment} className="submit-comment">
          Submit Comment
        </button>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">🗨 Comments</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="comment-item">
                <p className="text-gray-800">{c.content}</p>
                <p className="comment-user">
                  By <strong>{c.user?.username || 'Anonymous'}</strong> at{' '}
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage;