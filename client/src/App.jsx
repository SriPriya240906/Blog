import React from "react";
import { BrowserRouter, Router, Routes,Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import CreatePost from './pages/CreatePost';
import EditPost from "./EditPost";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
  );
}

export default App;