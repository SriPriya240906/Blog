import { Link } from 'react-router-dom';

function AuthOptions() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center space-y-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to BlogZone 📝</h1>
        <p className="text-gray-600">Choose an option to continue</p>

        <div className="space-y-4">
          <Link to="/register">
            <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition duration-200">
              ➕ New User? Register
            </button>
          </Link>

          <Link to="/login">
            <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition duration-200">
              🔐 Already Registered? Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthOptions;