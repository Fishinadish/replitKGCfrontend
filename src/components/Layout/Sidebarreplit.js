/*
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MenuItem = ({ icon, title, path, isActive, isOpen }) => (
  <Link
    to={path}
    className={`flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 ${
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
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  const menuItems = [
    { title: 'MIP', icon: '🎯', path: '/motivation-image' },
    { title: 'Inspiration Machine D', icon: '🍳', path: '/search-recipies' },
    { title: 'Diet Logistics', icon: '🥗', path: '/diet-logistics' },
    { title: 'Inspiration Machine E&W', icon: '💪', path: '/inspiration-machine-ew' },
    { title: 'E&W Support', icon: '🏃', path: '/gym-finder' },
    { title: 'MBP Wiz', icon: '💊', path: '/medication-search' },
    { title: 'Profile', icon: '👤', path: '/patient-profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 ${
        isOpen ? 'w-64 md:w-64' : 'w-16 md:w-20'
      } z-50`}>
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 bg-white shadow-lg rounded-full p-2 text-green-600 hover:bg-green-50"
        >
          {isOpen ? <span className="text-xl">◀</span> : <span className="text-xl">▶</span>}
        </button>

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

        <Link
          to="/patient-profile"
          className={`absolute bottom-16 w-full border-t border-gray-200 p-4 flex items-center space-x-3 text-gray-600 hover:text-green-600 hover:bg-green-50`}
        >
          <span className="text-xl">⚙️</span>
          {isOpen && <span>Settings</span>}
        </Link>

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

      <div className="w-full p-4">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;

*/


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SidebarProvider, useSidebar } from './sidebarcontext';

// Sidebar component (updated to remove kgcLogoPath import)
const Sidebar = ({ children, sidebarOpen, toggleSidebar }) => {
  const baseClasses = 'absolute right-0 top-0 h-full w-[300px] bg-white border-l border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg z-50';
  const conditionalClasses = sidebarOpen ? 'translate-x-0' : 'translate-x-full';
  const className = `${baseClasses} ${conditionalClasses}`;

  return (
    <div className={className}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* Use the public path directly */}
          <img src="/kgclogo.jpg" alt="KGC Logo" className="h-16 w-16" />
          <div>
            <h3 className="font-medium text-gray-800">Keep Going Care</h3>
            <p className="text-xs text-blue-600 italic">Lifestyle Prescription</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

// IconMenu component (unchanged)
const IconMenu = ({ menuItems, activePath }) => {
  return (
    <nav className="mt-6">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 ${
            activePath === item.path ? 'bg-green-50 text-green-600 border-r-4 border-green-600' : ''
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

// SidebarWithMenu component (unchanged)
const SidebarWithMenu = ({ patientInfo, handleLogout }) => {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { title: 'MIP', icon: '🎯', path: '/motivation-image' },
    { title: 'Inspiration Machine D', icon: '🍳', path: '/search-recipies' },
    { title: 'Diet Logistics', icon: '🥗', path: '/diet-logistics' },
    { title: 'Inspiration Machine E&W', icon: '💪', path: '/inspiration-machine-ew' },
    { title: 'E&W Support', icon: '🏃', path: '/gym-finder' },
    { title: 'MBP Wiz', icon: '💊', path: '/medication-search' },
    { title: 'Profile', icon: '👤', path: '/patient-profile' },
  ];

  return (
    <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
      <IconMenu menuItems={menuItems} activePath={location.pathname} />
      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <Link
          to="/patient-profile"
          className="flex items-center space-x-3 text-gray-600 hover:text-green-600 hover:bg-green-50 p-2"
        >
          <span className="text-xl">⚙️</span>
          {sidebarOpen && <span>Settings</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full p-2"
        >
          <span className="text-xl">🚪</span>
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </Sidebar>
  );
};

// Main AppLayout component (unchanged)
const AppLayout = ({ children }) => {
  const [patientInfo, setPatientInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://app.keepgoingcare.com/patient/my_profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <SidebarWithMenu patientInfo={patientInfo} handleLogout={handleLogout} />
        <div className="flex-1 transition-all duration-300">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;