import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  nodesOnline: number;
  totalCores: number;
  memoryAvailable: number;
  storageCapacity: number;
  launchComplete: boolean;
  setNodesOnline: (value: number) => void;
  setTotalCores: (value: number) => void;
  setMemoryAvailable: (value: number) => void;
  setLaunchComplete: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [nodesOnline, setNodesOnline] = useState(0);
  const [totalCores, setTotalCores] = useState(0);
  const [memoryAvailable, setMemoryAvailable] = useState(0);
  const [launchComplete, setLaunchComplete] = useState(false);
  
  // Storage capacity is static
  const storageCapacity = 1.5;

  return (
    <AppContext.Provider
      value={{
        nodesOnline,
        totalCores,
        memoryAvailable,
        storageCapacity,
        launchComplete,
        setNodesOnline,
        setTotalCores,
        setMemoryAvailable,
        setLaunchComplete
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}