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
  }, []) //TODO: update on route change! - this is not working after the user was logged out! "isAuthenticated" is not updated!!! (update: it is... after 2nd or 3rd trial)

  const loginUser = (token, username, fullName, numOfActions, maxActions) => {
    sessionStorage['accessToken'] = token
    sessionStorage['username'] = username
    sessionStorage['fullName'] = fullName
    sessionStorage['numOfActions'] = numOfActions
    sessionStorage['maxActions'] = maxActions
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    //sessionStorage.removeItem('accessToken')
    //sessionStorage.removeItem('username')
    //sessionStorage.removeItem('fullName')
    //sessionStorage.clear() //.removeItem('accessToken')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };