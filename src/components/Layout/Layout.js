// components/Layout/Layout.js
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;