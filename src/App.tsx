import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LaunchPage from './components/LaunchPage';
import StatusPage from './components/StatusPage';
import { AppProvider } from './context/AppContext';
import BioBackground from './components/BioBackground';

function App() {
  const [currentPage, setCurrentPage] = useState<'launch' | 'status'>('launch');

  return (
    <AppProvider>
      <div className="w-full min-h-screen min-w-screen overflow-hidden bg-background">
        <BioBackground />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="relative z-10"
          >
            {currentPage === 'launch' ? (
              <LaunchPage onComplete={() => setCurrentPage('status')} />
            ) : (
              <StatusPage />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}

export default App;