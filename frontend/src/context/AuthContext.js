import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // Add functions to login, register, and check user authentication
  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setAuth(data.token);
      localStorage.setItem('token', data.token);  // Save token to localStorage for persistence
    }
  };

  const register = async (name, email, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setAuth(data.token);
      localStorage.setItem('token', data.token);  // Save token
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  // Check if a user is already logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuth(token);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
