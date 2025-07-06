import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">📝 MyBlog</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/create" className="hover:underline">+ Create Blog</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;