'use client'
import React, { createContext, useState } from 'react';

const LoginContext = createContext({ isLoggedIn: false, setIsLoggedIn: (value: boolean) => {} }); 
const LoginContextProvider = ({ children }: { children: React.ReactNode }) => { 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  return ( 
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}> 
      {children} 
    </LoginContext.Provider> 
  ); 
};

export { LoginContext, LoginContextProvider };