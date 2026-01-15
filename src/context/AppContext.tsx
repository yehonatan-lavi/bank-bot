import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, Screen, Transaction } from '../types';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  addUser: (user: User) => void;
  getUserByUsername: (username: string) => User | undefined;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateUserBalance: (userId: string, newBalance: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'demo',
      email: 'demo@bank.com',
      password: 'demo123',
      balance: 10000,
    },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const getUserByUsername = (username: string) => {
    return users.find((u) => u.username === username);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateUserBalance = (userId: string, newBalance: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, balance: newBalance } : user
      )
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, balance: newBalance });
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentUser,
        setCurrentUser,
        users,
        addUser,
        getUserByUsername,
        transactions,
        addTransaction,
        updateUserBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};


