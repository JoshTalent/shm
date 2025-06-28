import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.jpg';
import logoBlack from '../../assets/logo-black.jpg';
import Cookies from 'js-cookie';
import {
  SunIcon,
  MoonIcon,
  UserIcon,
  KeyIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'doctor', // Default to doctor
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark-mode');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_username: formData.username,
          user_password: formData.password,
          user_usertype: formData.userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token in localStorage
      Cookies.set('token', data.token);
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${
      isDarkMode 
        ? 'dark bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="relative min-h-screen">
        {/* Enhanced gradient overlay with animation */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50'
            : 'bg-gradient-to-br from-blue-50 via-white to-gray-50 opacity-30'
        }`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Content wrapper with fade-in animation */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 animate-fadeIn">
          {/* Enhanced dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
              isDarkMode
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 transform transition-transform hover:rotate-90" />
            ) : (
              <MoonIcon className="w-6 h-6 transform transition-transform hover:-rotate-90" />
            )}
          </button>

          {/* Login Form with enhanced animations */}
          <div className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl ${
            isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
          }`}>
            {/* Animated logo */}
            <div className="flex justify-center mb-8 transform transition-all duration-300 hover:scale-105">
              <img 
                src={isDarkMode ? logoBlack : logoWhite}
                alt="R Health Care Logo"
                className="h-16 md:h-20 filter drop-shadow-lg"
              />
            </div>

            <h2 className={`text-2xl font-bold text-center mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome Back
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700 animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="userType"
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <UserGroupIcon className="w-5 h-5" />
                    User Type
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 outline-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500'
                    }`}
                    required
                  >
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="username"
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <UserIcon className="w-5 h-5" />
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 outline-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label 
                    htmlFor="password"
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <KeyIcon className="w-5 h-5" />
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 outline-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500'
                    }`}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:translate-y-[-1px] flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center mt-6">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                </span>
                <Link
                  to="/register"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-300 hover:underline"
                >
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
