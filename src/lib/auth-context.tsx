'use client';

import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

interface User {
  id: string; 
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  debugger
  const [user, setUser] = useState<User | null>(null);
  

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    
    try {
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/me`, { withCredentials: true, })

      console.log(response);
      if (response.status === 200) {

        const userData = response.data;
        console.log(userData);
        if (userData && userData.username) {
          console.log("User Data", userData.username);
          setUser(userData);
          console.log("User Data", user);
        }
      }
      
   
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  
  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  debugger
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}