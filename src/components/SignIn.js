import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordResetModal from './Modals/ResetPassword';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch('https://app.keepgoingcare.com/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Store the token, role, and user ID globally through context
      login({ token: data.access_token, role: data.role, user_id: data.user_id });
      console.log("User logged in:", data);
      // Redirect based on role
      console.log("User Role: ", data.role)
      if (data.role.toLowerCase() === 'doctor') {
        console.log("Navigating to doctor dashboard...");
        navigate('/dashboard');
      } else if (data.role.toLowerCase() === 'patient') {
        console.log("Navigating to patient profile...");
        navigate('/patient-profile');
      } else if (data.role.toLowerCase() === 'admin') {
        navigate('/admin')
      } else {
        setError('Invalid role received');
      }
    } catch (err) {
      setError('Error: Unable to login. Please try again.');
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Sign In
          </button>
        </form>
        {/* Forgot Password Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => setIsModalOpen(true)} // Open the modal when clicked
          >
            Forgot Password?
          </span>
        </p>
        {/* Render the Password Reset Modal */}
        {isModalOpen && (
          <PasswordResetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} // Close the modal
          />
        )}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
