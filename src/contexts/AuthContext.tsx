
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock users for demo purposes
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
  ];

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email });
      return true;
    }
    return false;
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    mockUsers.push(newUser);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    isSignedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
