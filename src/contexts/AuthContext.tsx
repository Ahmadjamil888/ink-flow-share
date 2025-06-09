import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// --- Types ---
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

// --- Context & Hook ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

// --- Helpers ---
const hashPassword = (raw: string, userId: string) => `hashed_${raw}_${userId}`;

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

// --- Provider ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users and current user from localStorage or fallback to initialUsers
  useEffect(() => {
    // Load users
    const savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
      try {
        const parsed: User[] = JSON.parse(savedUsers).map((u: any) => ({
          ...u,
          createdAt: new Date(u.createdAt),
        }));
        setUsers(parsed);
      } catch {
        setUsers(
          initialUsers.map(u => ({
            ...u,
            createdAt: new Date(u.createdAt),
          }))
        );
      }
    } else {
      setUsers(
        initialUsers.map(u => ({
          ...u,
          createdAt: new Date(u.createdAt),
        }))
      );
    }

    // Load current user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        parsed.createdAt = new Date(parsed.createdAt);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Persist users
  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(users));
  }, [users]);

  // Persist current user
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  // --- Auth Methods ---
  const login = (email: string, password: string) => {
    const found = users.find(
      u => u.email === email && u.password === hashPassword(password, u.id)
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    if (users.some(u => u.email === email)) return false;
    const id = Date.now().toString();
    const newUser: User = {
      id,
      name,
      email,
      password: hashPassword(password, id),
      createdAt: new Date(),
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const deleteUser = (userId: string) => {
    if (user?.id === userId) return false; // Prevent deleting yourself
    setUsers(prev => prev.filter(u => u.id !== userId));
    return true;
  };

  // --- Context Value ---
  const value: AuthContextType = {
    user,
    users,
    login,
    register,
    logout,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
