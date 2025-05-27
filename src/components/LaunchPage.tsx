import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProgressSequence from './ProgressSequence';
import { Cpu } from 'lucide-react';
import Logo from './Logo';
import Particles from './Particles';

interface LaunchPageProps {
  onComplete: () => void;
}

const LaunchPage = ({ onComplete }: LaunchPageProps) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setLaunchComplete } = useAppContext();
  
  const steps = [
    "Preparing Systems...",
    "Checking Services...",
    "Verifying Network Connectivity...",
    "Mounting Storage Systems...",
    "All Systems online...",
    "Launching HPC..."
  ];

  const currentStep = Math.min(Math.floor(progress / (100 / steps.length)), steps.length - 1);

  useEffect(() => {
    if (!isLaunching) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLaunchComplete(true);
            onComplete();
          }, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLaunching, onComplete, setLaunchComplete]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between">
      <Particles />
      
      <div className="absolute inset-0 flex flex-col items-center justify-between p-5 z-10">
        <div className="w-full flex justify-center">
          <Logo />
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl mx-auto">
          {!isLaunching ? (
            <button
              onClick={() => setIsLaunching(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg 
                        text-2xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105
                        hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-8 h-8" />
                <span>LAUNCH</span>
              </div>
            </button>
          ) : (
            <ProgressSequence 
              steps={steps} 
              currentStep={currentStep} 
              progress={progress}
            />
          )}
        </div>
        
        <div className="w-full text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} African Center of Excellence in Bioinformatics and Data Intensive Sciences</p>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;