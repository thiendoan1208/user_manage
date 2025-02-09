import React, { useState } from 'react';

// @function  UserContext
const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', auth: false });

  const loginContext = (res, email) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('email', email);
    setUser({
      email: email,
      auth: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser({
      email: '',
      auth: false,
    });
  };

  return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
