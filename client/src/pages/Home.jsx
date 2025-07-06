import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('❌ Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Blog Buzz</h1>
       
      </div>

      <div className="home-actions">
       
      </div>

      <div className="blog-header">
  <h1>Latest Blogs !</h1>
  <div className="right-buttons">
    {user && (
      <>
        <button
          onClick={() => {
            logout();
            SpeechSynthesisUtterance(null)
            navigate('/');
          }}
          className="logout-button"
        >
          Logout
        </button>
        <Link to="/create">
          <button className="create-button">+ Create Blog</button>
        </Link>
      </>
    )}
  </div>
</div>
      {blogs.length === 0 ? (
        <p className="no-blogs">No blog posts yet.</p>
      ) : (
        <div className="blog-list">
          {blogs.map((blog) => (
            <Link to={`/post/${blog._id}`} key={blog._id} className="blog-card-link">
              <div className="blog-card">
                <p className="blog-title"><strong>TITLE:</strong> {blog.title}</p>
                <p className="blog-snippet"><strong>CONTENT:</strong> {blog.content.slice(0, 150)}...</p>
                <p className="blog-author"><strong>AUTHOR:</strong> {blog.author?.username || 'Unknown'}</p>
                <p className="blog-date"><strong>DATE:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;