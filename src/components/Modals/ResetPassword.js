import React, { useState } from 'react';

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('request'); // "request" or "reset"
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRequestReset = async () => {
    setError('');
    setSuccessMessage('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const response = await fetch('https://app.keepgoingcare.com/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { detail } = await response.json();
        throw new Error(detail || 'Failed to request password reset.');
      }

      setSuccessMessage('Reset code has been sent to your email.');
      setStep('reset');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setSuccessMessage('');

    if (!resetCode || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://app.keepgoingcare.com/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reset_code: resetCode, new_password: newPassword }),
      });

      if (!response.ok) {
        const { detail } = await response.json();
        throw new Error(detail || 'Failed to reset password.');
      }

      setSuccessMessage('Your password has been reset successfully.');
      setStep('request');
      onClose(); // Close the modal after successful reset
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {step === 'request' ? 'Request Password Reset' : 'Reset Password'}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        {step === 'request' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleRequestReset}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Send Reset Code
            </button>
          </>
        )}

        {step === 'reset' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Reset Code</label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter the reset code sent to your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your new password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Confirm your new password"
              />
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Reset Password
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PasswordResetModal;
