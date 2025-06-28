import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.jpg';
import logoBlack from '../../assets/logo-black.jpg';
import Cookies from 'js-cookie';
import { 
  UserCircleIcon, 
  BellIcon, 
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Header = ({ isDarkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen, activeTab }) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [token, navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isScrolled
        ? isDarkMode
          ? 'border-b border-gray-700 bg-gray-900/95 shadow-lg shadow-gray-900/20'
          : 'border-b border-gray-200 bg-white/95 shadow-lg shadow-gray-200/20'
        : 'bg-transparent'
    }`}>
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`group p-2 rounded-lg lg:hidden transition-all duration-300 ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-6 h-6 transform transition-transform group-hover:scale-110" />
            </button>
            <Link to="/dashboard" className="flex items-center">
              <img 
                src={isDarkMode ? logoBlack : logoWhite} 
                alt="R Health Care Logo" 
                className="h-8 md:h-12 mr-3 transition-all duration-300 hover:opacity-80"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            <button
              className={`relative p-2 rounded-lg transition-all duration-300 group ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BellIcon className="w-6 h-6 transform transition-transform group-hover:scale-110" />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 group ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <SunIcon className="w-6 h-6 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
              ) : (
                <MoonIcon className="w-6 h-6 transform transition-transform group-hover:scale-110 group-hover:-rotate-12" />
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center gap-2 p-1.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 focus:ring-gray-600'
                    : 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300'
                }`}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/25">
                  DR
                </div>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-1 transition-all duration-300 transform origin-top-right 
                    ${isDarkMode
                      ? 'bg-gray-800 border border-gray-700 shadow-gray-900/50'
                      : 'bg-white border border-gray-200 shadow-gray-200/50'
                    }
                    animate-dropdown
                  `}
                >
                  <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Dr. Richard</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>richard@healthcare.com</p>
                  </div>

                  <Link
                    to="/profile"
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 group ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <UserCircleIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    Your Profile
                  </Link>

                  <Link
                    to="/settings"
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 group ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Cog6ToothIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors duration-300 group ${
                      isDarkMode
                        ? 'text-red-400 hover:bg-gray-700'
                        : 'text-red-600 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;