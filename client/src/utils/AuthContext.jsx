// ref: https://dev.to/stephengade/build-custom-middleware-for-a-reactnextjs-app-with-context-api-2ed3
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasAccess = sessionStorage['accessToken']

    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, [])

  const loginUser = (token, username, fullName, numOfActions, maxActions) => {
    sessionStorage['accessToken'] = token
    sessionStorage['username'] = username
    sessionStorage['fullName'] = fullName
    sessionStorage['numOfActions'] = numOfActions
    sessionStorage['maxActions'] = maxActions
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    sessionStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };