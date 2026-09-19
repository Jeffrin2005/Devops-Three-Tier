import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard")
        } else {
          navigate("/employee-dashboard")
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }
    }
  }

  const fillCredentials = (role) => {
    if (role === "admin") {
      setEmail("admin@gmail.com");
      setPassword("admin");
    } else {
      setEmail("employee@gmail.com");
      setPassword("employee");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Employee Management System
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-indigo-500" />
              <span className="ml-2 select-none">Remember me</span>
            </label>
            <button type="button" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Default Credentials Section */}
        <div className="mt-6 border-t pt-4">
          <p className="text-xs text-center text-gray-400 mb-3">🔑 Default Credentials (click to fill)</p>
          <div className="flex gap-3">
            <button
              onClick={() => fillCredentials("admin")}
              className="flex-1 border border-indigo-200 rounded-lg p-3 text-left hover:bg-indigo-50 transition-colors"
            >
              <p className="text-xs font-semibold text-indigo-600 mb-1">👤 Admin</p>
              <p className="text-xs text-gray-500">admin@gmail.com</p>
              <p className="text-xs text-gray-500">password: admin</p>
            </button>
            <button
              onClick={() => fillCredentials("employee")}
              className="flex-1 border border-purple-200 rounded-lg p-3 text-left hover:bg-purple-50 transition-colors"
            >
              <p className="text-xs font-semibold text-purple-600 mb-1">👷 Employee</p>
              <p className="text-xs text-gray-500">employee@gmail.com</p>
              <p className="text-xs text-gray-500">password: employee</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
