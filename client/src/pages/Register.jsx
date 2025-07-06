import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // import the CSS file

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      alert('✅ Registered successfully! You can now log in.');
      navigate('/');
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-box">
        <h2 className="register-title">Register an Account 📝</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          required
        />

        <div className="register-button-group">
          <button type="submit" className="register-button green">
            Register
          </button>

          <Link to="/">
            <button type="button" className="register-button blue">
              Go to Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;