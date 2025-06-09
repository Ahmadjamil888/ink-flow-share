import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  deleteUser: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper to simulate password hashing (DO NOT use in production)
const hashPassword = (raw: string, userId: string) =>
  `hashed_${raw}_${userId}`;

const initialUsers: Omit<User, 'createdAt'> & { createdAt: string }[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password_123_1',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'hashed_password_456_2',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // On mount: load state from localStorage, or use initial users
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('allUsers');
      if (savedUsers) {
        const parsed: User[] = JSON.parse(savedUsers).map((u: any) => ({
          ...u,
          createdAt: new Date(u.createdAt),
        }));
        setUsers(parsed);
      } else {
        setUsers(
          initialUsers.map((u) => ({
            ...u,
            createdAt: new Date(u.createdAt),
          }))
        );
      }
    } catch {
      setUsers(
        initialUsers.map((u) => ({
          ...u,
          createdAt: new Date(u.createdAt),
        }))
      );
    }

    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        parsed.createdAt = new Date(parsed.createdAt);
        setUser(parsed);
      }
    } catch {
      setUser(null);
    }
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === hashPassword(password, u.id)
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (
    name: string,
    email: string,
    password: string
  ): boolean => {
    if (users.some((u) => u.email === email)) return false;
    const id = Date.now().toString();
    const newUser: User = {
      id,
      name,
      email,
      password: hashPassword(password, id),
      createdAt: new Date(),
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const deleteUser = (userId: string): boolean => {
    if (user?.id === userId) return false; // Prevent deleting current user
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return true;
  };

  const value: AuthContextType = {
    user,
    users,
    login,
    register,
    logout,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
