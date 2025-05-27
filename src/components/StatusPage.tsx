import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import CircularProgressMeter from './CircularProgressMeter';
import ServerNodesGrid from './ServerNodesGrid';
import Logo from './Logo';
import Particles from './Particles';

const StatusPage = () => {
  const { 
    nodesOnline, 
    totalCores, 
    memoryAvailable, 
    storageCapacity,
    setNodesOnline,
    setTotalCores,
    setMemoryAvailable
  } = useAppContext();

  // Animation timing
  useEffect(() => {
    const animationDuration = 180000;
    const totalNodes = 56;
    const coresPerNode = 64;
    const memoryPerNode = 96;
    const totalCoresMax = totalNodes * coresPerNode;
    const memoryMax = totalNodes * memoryPerNode;
    
    const interval = 50;
    const steps = animationDuration / interval;
    
    const nodeIncrement = totalNodes / steps;
    const coreIncrement = totalCoresMax / steps;
    const memoryIncrement = memoryMax / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      const progress = 1 - Math.pow(1 - currentStep / steps, 3);
      
      setNodesOnline(Math.min(Math.floor(totalNodes * progress), totalNodes));
      setTotalCores(Math.min(Math.floor(totalCoresMax * progress), totalCoresMax));
      setMemoryAvailable(Math.min(Math.floor(memoryMax * progress), memoryMax));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [setNodesOnline, setTotalCores, setMemoryAvailable]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <Particles />
      
      <div className="absolute inset-0 z-10 flex flex-col p-6">
        <div className="mb-4">
          <Logo />
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="h-[45%] mb-4">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 h-full border border-gray-800">
              <h2 className="text-white text-2xl font-bold mb-4">Cluster Performance</h2>
              <div className="grid grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                <CircularProgressMeter 
                  title="Nodes Online" 
                  value={nodesOnline} 
                  maxValue={56} 
                  unit=""
                  color="red" 
                />
                <CircularProgressMeter 
                  title="Total Cores Active" 
                  value={totalCores} 
                  maxValue={3584} 
                  unit=""
                  color="blue" 
                />
                <CircularProgressMeter 
                  title="Memory Available" 
                  value={memoryAvailable} 
                  maxValue={5376} 
                  unit="GB"
                  color="green" 
                />
                <CircularProgressMeter 
                  title="Storage Capacity" 
                  value={storageCapacity} 
                  maxValue={1.5} 
                  unit="PB"
                  color="purple"
                  isStatic 
                />
              </div>
            </div>
          </div>
          
          <div className="h-[55%]">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 h-full border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-2xl font-bold">Cluster Nodes</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-white text-sm">Initializing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-white text-sm">Online</span>
                  </div>
                </div>
              </div>
              <ServerNodesGrid nodesOnline={nodesOnline} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;