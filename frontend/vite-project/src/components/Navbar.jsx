import React, { useState, useEffect } from 'react'
import { Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Check login status on component mount and when local storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('user_email');
      
      setIsLoggedIn(!!token);
      setUserEmail(email || '');
    };

    // Check initial status
    checkLoginStatus();

    // Listen for storage changes (works across tabs)
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove authentication tokens and user info
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    
    // Trigger storage event to update login status across tabs
    window.dispatchEvent(new Event('storage'));

    // Navigate to home page or login page
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* App name/logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 md:text-3xl">
              Lint Yamls
            </Link>
          </div>

          {/* Desktop navigation buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/compare" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Compare
            </Link>
            <Link to="/convert" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Convert
            </Link>
            
            {/* Conditional Auth Link */}
            {isLoggedIn ? (
              <div className="relative group">
                <div className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 flex items-center cursor-pointer">
                  <User size={14} className="mr-2" />
                  {userEmail || 'My Account'}
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 right-0 z-10 w-full">
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 flex items-center">
                Login/Signup <Lock size={14} className="ml-2" />
              </Link>
            )}
          </div>      

          {/* Mobile navigation button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg p-4 space-y-2 origin-top animate-dropdown">
            <Link to="/" className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/compare" className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Compare
            </Link>
            <Link to="/convert" className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Convert
            </Link>
            
            {/* Mobile Auth Link */}
            {isLoggedIn ? (
              <>
                <div className="block w-full text-left px-3 py-2 text-gray-700 flex items-center">
                  <User size={14} className="mr-2" />
                  {userEmail || 'My Account'}
                </div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 flex items-center">
                Login/Signup <Lock size={14} className="ml-2" />
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;