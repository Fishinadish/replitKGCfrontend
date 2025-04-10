import React, { createContext, useContext, useState } from 'react';

// Create context with undefined as default value
export const SidebarContext = createContext(undefined);

// Provider component that wraps the app
export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Values to be provided to consuming components
  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

// Custom hook for accessing the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};