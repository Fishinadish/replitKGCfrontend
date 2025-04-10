// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     // Initialize from localStorage to handle page refresh
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role').toLocaleLowerCase();
//     const user_id = localStorage.getItem('user_id');
//     return token && role && user_id ? { token, role, user_id } : null;
//   });

//   useEffect(() => {
//     // Update state from localStorage if it exists, this is helpful for refreshes
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     const user_id = localStorage.getItem('user_id');

//     if (token && role && user_id) {
//       setUser({ token, role, user_id });
//     }
//   }, []);

//   const login = (userData) => {
//     // Set state and store user data in localStorage
//     setUser(userData);
//     localStorage.setItem('token', userData.token);
//     localStorage.setItem('role', userData.role);
//     localStorage.setItem('user_id', userData.user_id);
//   };
//   console.log("User data in context:", user);
//   const logout = () => {
//     // Clear state and remove user data from localStorage
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('user_id');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }


// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     // Initialize from localStorage to handle page refresh and standardize role format
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role')?.toLowerCase(); // lowercase role
//     const user_id = localStorage.getItem('user_id');
//     return token && role && user_id ? { token, role, user_id } : null;
//   });

//   const login = (userData) => {
//     // Standardize role to lowercase and store in state and localStorage
//     const formattedUser = { 
//       ...userData, 
//       role: userData.role.toLowerCase() 
//     };
//     setUser(formattedUser);
//     localStorage.setItem('token', formattedUser.token);
//     localStorage.setItem('role', formattedUser.role);
//     localStorage.setItem('user_id', formattedUser.user_id);
//   };

//   const logout = () => {
//     // Clear state and remove user data from localStorage
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('user_id');
//   };

//   console.log("User data in context:", user); // Debugging: verify user data in context

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }


import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.toLowerCase();
    const user_id = localStorage.getItem('user_id');
    if (token && role && user_id) {
      // Check if token is expired
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token has expired
          localStorage.clear();
          return null;
        }
      } catch (e) {
        console.error('Invalid token:', e);
        return null;
      }
      return { token, role, user_id };
    }
    return null;
  });

  const login = (userData) => {
    const formattedUser = {
      ...userData,
      role: userData.role.toLowerCase(),
    };
    setUser(formattedUser);
    localStorage.setItem('token', formattedUser.token);
    localStorage.setItem('role', formattedUser.role);
    localStorage.setItem('user_id', formattedUser.user_id);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (user?.token) {
      try {
        const decodedToken = jwtDecode(user.token);
        const expiresAt = decodedToken.exp * 1000;

        if (expiresAt < Date.now()) {
          // Token has already expired
          logout();
        } else {
          // Set a timeout to log the user out when the token expires
          const timeout = setTimeout(logout, expiresAt - Date.now());
          return () => clearTimeout(timeout);
        }
      } catch (e) {
        console.error('Error decoding token:', e);
        logout();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
