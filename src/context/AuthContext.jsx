import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cursed_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const register = (name, email, password) => {
    // In a real app, this would call an API
    const users = JSON.parse(localStorage.getItem('cursed_users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    users.push({ ...newUser, password }); // Store password (in real app, hash it!)
    localStorage.setItem('cursed_users', JSON.stringify(users));
    
    // Auto-login after registration
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('cursed_user', JSON.stringify(newUser));
    
    return newUser;
  };

  const login = (email, password) => {
    // In a real app, this would call an API
    const users = JSON.parse(localStorage.getItem('cursed_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userData } = user;
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('cursed_user', JSON.stringify(userData));
    
    return userData;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cursed_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
