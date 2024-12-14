import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, UserPlus } from 'lucide-react';
import Confetti from 'react-confetti';

const LoginSignup = () => {
  // Navigation hook for redirecting after authentication
  const navigate = useNavigate();

  // State management for form and authentication
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Validate password match for signup
      if (!isLogin && password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Determine authentication action
      const action = isLogin ? 'login' : 'signup';

      // Send authentication request
      const response = await axios.post(
        `https://now.sumitdethe.live/api/auth?action=${action}`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            
          },
        }
      );

      // Handle successful authentication
      const { access_token } = response.data;

      // Store token and email immediately
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_email', email);
      
      // Trigger storage event to update across components
      window.dispatchEvent(new Event('storage'));

      // Trigger success state and navigation
      console.log('Authentication successful');
      setIsLoggedIn(true);

      // Redirect after animation
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } 
    catch (err) {
      // Handle specific authentication errors
      if (err.response?.data?.detail === 'User already exists') {
        setError('This email is already registered. Please use a different email.');
      } else {
        setError(err.response?.data?.detail || 'An error occurred during authentication.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6 animate-fadeIn">
          {/* Authentication Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-blue-50 p-1">
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  isLogin 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message Display */}
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password for Signup */}
            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              )}
            </button>

            {/* Mode Switch Option */}
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-blue-600 hover:underline"
              >
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
              </button>
            </div>
          </form>

          {/* Success Animation */}
          {isLoggedIn && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <div className="text-3xl text-green-600 font-semibold animate-pulse">
                You are now logged in 🎉
              </div>
            </div>
          )}

          {/* Forgot Password Link (Login Mode Only) */}
          {isLogin && (
            <div className="text-center">
              <a 
                href="#" 
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </a>
            </div>
          )}
        </div>

        {/* Alternative Action Prompt */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-600 hover:underline font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
