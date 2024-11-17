// Navbar.jsx
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* App name/logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600 md:text-3xl">
              Lint Yamls
            </span>
          </div>

          {/* Desktop navigation buttons */}
          <div className="hidden md:flex space-x-4">
            <Link to="/home" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Compare
            </Link>
            <Link to="/convert" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Convert
            </Link>
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
            <Link to="/about" className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              About
            </Link>
            <Link to="/contact" className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar