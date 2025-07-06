import React from "react";
import { useNavigate } from "react-router-dom";
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="main-title">Welcome to Blog Buzz</h2>

        <div className="auth-box">
          <h1 className="auth-heading">We're Excited to Have You!</h1>
          <button
            className="auth-button login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="auth-button register"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;