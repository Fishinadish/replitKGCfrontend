// // components/Layout/Sidebar.js
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const MenuItem = ({ icon, title, path, isActive }) => (
//   <Link
//     to={path}
//     className={`flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 ${
//       isActive ? 'bg-green-50 text-green-600 border-r-4 border-green-600' : ''
//     }`}
//   >
//     {icon}
//     <span>{title}</span>
//   </Link>
// );

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const menuItems = [
//     {
//       title: 'My Motivation',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
//         </svg>
//       ),
//       path: '/motivation-image'
//     },
//     {
//       title: 'Profile',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//         </svg>
//       ),
//       path: '/patient-profile'
//     },
//     {
//       title: '⁠MBP Wiz',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
//         </svg>
//       ),
//       path: '/medication-search'
//     },
//     {
//       title: 'Diet Logistics',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M17.649 3.351a8 8 0 10-11.298 11.298l4.948 4.948a2 2 0 002.828 0l3.522-3.522a2 2 0 000-2.828l-4.948-4.948z" clipRule="evenodd" />
//         </svg>
//       ),
//       path: '/diet-logistics'
//     },
//     {
//       title: '⁠E&W Support',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//         </svg>
//       ),
//       path: '/gym-finder'
//     },
//     {
//       title: '⁠Inspiration Machine E&W',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
//           <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
//         </svg>
//       ),
//       path: '/inspiration-machine-ew'
//     },
//     {
//       title: 'Inspiration Machine D',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
//           <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
//         </svg>
//       ),
//       path: '/search-recipies'
//     }
//   ];

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`fixed top-24 ${isOpen ? 'left-64' : 'left-0'} z-50 bg-green-600 text-white p-2 rounded-r-lg transition-all duration-300 hover:bg-green-700`}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           {isOpen ? (
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
//           ) : (
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//           )}
//         </svg>
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } z-40`}
//       >
//         <div className="w-64 h-full flex flex-col">
//           {/* Logo Section */}
//           <div className="bg-green-600 text-white p-6">
//             <h2 className="text-xl font-bold">Keep Going Care</h2>
//           </div>

//           {/* Menu Items */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             {menuItems.map((item, index) => (
//               <MenuItem
//                 key={index}
//                 {...item}
//                 isActive={location.pathname === item.path}
//               />
//             ))}
//           </nav>
//           {/* Settings Section */}
//           <div className="p-4 border-t border-gray-200">
//             <Link
//               to="/settings"
//               className="flex items-center space-x-3 text-gray-600 hover:text-green-600"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>Settings</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Sidebar;
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
    {
      title: 'MIP',
      icon: '🎯',
      path: '/motivation-image'
    },
    {
      title: 'Inspiration Machine D',
      icon: '🍳',
      path: '/search-recipies'
    },
    {
      title: 'Diet Logistics',
      icon: '🥗',
      path: '/diet-logistics'
    },
    {
      title: 'Inspiration Machine E&W',
      icon: '💪',
      path: '/inspiration-machine-ew'
    },
    {
      title: 'E&W Support',
      icon: '🏃',
      path: '/gym-finder'
    },
    {
      title: 'MBP Wiz',
      icon: '💊',
      path: '/medication-search'
    },
    {
      title: 'Profile',
      icon: '👤',
      path: '/patient-profile'
    },
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

        {/* Settings Section */}
        <Link
          to="/patient-profile"
          className={`absolute bottom-16 w-full border-t border-gray-200 p-4 flex items-center space-x-3 text-gray-600 hover:text-green-600 hover:bg-green-50`}
        >
          <span className="text-xl">⚙️</span>
          {isOpen && <span>Settings</span>}
        </Link>

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