// components/Layout/AppLayout.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MenuItem = ({ icon, title, path, isActive, isOpen }) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 ${
      isActive ? 'bg-green-50 text-green-600 border-r-4 border-green-600' : ''
    }`}
  >
    <span className="text-xl">{icon}</span>
    {isOpen && <span>{title}</span>}
  </Link>
);

const AppLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [patientInfo, setPatientInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch patient info
      fetch('https://app.keepgoingcare.com/patient/my_profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) throw new Error('Unauthorized access');
          return response.json();
        })
        .then(data => {
          setPatientInfo(data);
        })
        .catch(error => {
          console.error('Error fetching patient data:', error);
          // If there's an error (like invalid token), redirect to login
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      path: '/dashboard'
    },
    {
      title: 'Profile',
      icon: '👤',
      path: '/profile'
    },
    {
      title: 'Health Records',
      icon: '📋',
      path: '/records'
    },
    {
      title: 'Medications',
      icon: '💊',
      path: '/medications'
    },
    {
      title: 'Exercise Plans',
      icon: '🏃',
      path: '/exercise'
    },
    {
      title: 'Diet Plans',
      icon: '🥗',
      path: '/diet'
    },
    {
      title: 'Motivation',
      icon: '🎯',
      path: '/motivation'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        } z-40`}
      >
        {/* Logo Section */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏥</span>
            {isOpen && <h2 className="text-xl font-bold">Keep Going Care</h2>}
          </div>
          {isOpen && patientInfo && (
            <div className="mt-4 text-sm">
              <p className="truncate">Welcome, {patientInfo.name}</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 bg-white shadow-lg rounded-full p-2 text-green-600 hover:bg-green-50"
        >
          {isOpen ? (
            <span className="text-xl">◀</span>
          ) : (
            <span className="text-xl">▶</span>
          )}
        </button>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              isActive={location.pathname === item.path}
              isOpen={isOpen}
            />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full"
          >
            <span className="text-xl">🚪</span>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;