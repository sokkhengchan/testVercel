import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

import { auth, googleProvider, facebookProvider, githubProvider } from '../../Firebase/firebase.config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // redirect after login
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  // Social Login
  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Social login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex overflow-hidden">
        {/* Left Side Image and Text */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-indigo-600 to-pink-500 text-white p-16">
          <img
            src="/img-placeholder.svg"
            alt="Welcome"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 flex flex-col justify-center">
            <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome Back!</h2>
            <p className="text-lg font-medium max-w-md drop-shadow-sm">
              Unlock personalized features by logging in to your account.
            </p>
            <span className="mt-8 inline-block bg-white bg-opacity-30 px-6 py-3 rounded-full text-sm uppercase tracking-wide font-semibold shadow-lg">
              New Features Await
            </span>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 p-10 sm:p-14">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Login</h1>
          <p className="text-center text-gray-500 mb-8">Access your dashboard below</p>

          <form className="space-y-7" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@example.com"
                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="inline-flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="ml-2">Remember me</span>
              </label>
              <NavLink to="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </NavLink>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-3 shadow-lg transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="mt-10 flex justify-center space-x-8">
            <button
              onClick={() => handleSocialLogin(googleProvider)}
              aria-label="Login with Google"
              className="hover:scale-110 transition-transform"
            >
              <FcGoogle size={36} />
            </button>
            <button
              onClick={() => handleSocialLogin(facebookProvider)}
              aria-label="Login with Facebook"
              className="text-blue-700 hover:text-blue-800 hover:scale-110 transition-transform"
            >
              <FaFacebook size={36} />
            </button>
            <button
              onClick={() => handleSocialLogin(githubProvider)}
              aria-label="Login with GitHub"
              className="text-gray-900 hover:text-black hover:scale-110 transition-transform"
            >
              <FaGithub size={36} />
            </button>
          </div>

          <p className="mt-12 text-center text-gray-500">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-indigo-600 font-semibold hover:underline">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
