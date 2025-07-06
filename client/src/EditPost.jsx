import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css'; // External CSS file

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error loading post for editing:", err.message);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`
        http://localhost:5000/api/blogs/${id}`,
        { title, content },
        {
          headers: {
            Authorization:` Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('✅ Post updated');
      navigate(`/post/${id}`);
    } catch (err) {
      console.error('❌ Error updating post:', err.message);
      alert('Update failed. Try again.');
    }
  };

  if (loading)
    return <p className="loading-message">Loading post for editing...</p>;

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-title">✏ Edit Blog Post</h2>

      <form onSubmit={handleUpdate}>
        <div className="edit-field-group">
          <label className="edit-field-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-input"
            required
          />
        </div>

        <div className="edit-field-group">
          <label className="edit-field-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-textarea"
            required
          ></textarea>
        </div>

        <button type="submit" className="edit-button update-btn">
          Update Post
        </button>

        <button
          type="button"
          className="edit-button back-btn"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </form>
    </div>
  );
}

export default EditPost;