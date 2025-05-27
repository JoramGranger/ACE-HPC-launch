import { useState, useEffect, useRef } from 'react';
import { Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServerNodeProps {
  nodeId: number;
  isActive: boolean;
}

interface NodeMetrics {
  cores: number;
  memory: number;
  temperature: number;
  loadAverage: number;
}

const ServerNode = ({ nodeId, isActive }: ServerNodeProps) => {
  const [status, setStatus] = useState<'offline' | 'initializing' | 'online'>('offline');
  const [showDetails, setShowDetails] = useState(false);
  const [metrics, setMetrics] = useState<NodeMetrics>({
    cores: 64,
    memory: 96,
    temperature: 45.5,
    loadAverage: 0.45
  });
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive) {
      setStatus('offline');
      return;
    }
    
    setStatus('initializing');
    
    const timer = setTimeout(() => {
      setStatus('online');
    }, 1000 + Math.random() * 2000);
    
    return () => clearTimeout(timer);
  }, [isActive]);
  
  const statusColors = {
    offline: 'bg-gray-700',
    initializing: 'bg-amber-500',
    online: 'bg-green-500'
  };
  
  const containerOpacity = status === 'offline' ? 'opacity-40' : 'opacity-100';
  
  const getStatusLabel = () => {
    switch (status) {
      case 'offline': return 'Node Offline';
      case 'initializing': return 'Node Initializing';
      case 'online': return 'Node Online';
    }
  };

  return (
    <div 
      ref={nodeRef}
      className={`relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-2 
                transition-all duration-300 hover:bg-gray-700/80 hover:scale-105 
                ${containerOpacity} flex flex-col items-center justify-center`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      role="button"
      aria-label={`Server Node ${String(nodeId).padStart(2, '0')} - ${getStatusLabel()}`}
    >
      <Server 
        className={`w-6 h-6 mb-1 ${status === 'offline' ? 'text-gray-500' : 'text-white'}`} 
      />
      <div className="text-xs font-mono text-gray-300 mb-1">Node-{String(nodeId).padStart(2, '0')}</div>
      <div className="flex items-center justify-center gap-1 mt-1">
        <div 
          className={`w-2 h-2 rounded-full ${statusColors[status]} shadow-lg ${
            status === 'initializing' ? 'animate-pulse' : ''
          }`}
          role="status"
          aria-label={getStatusLabel()}
        ></div>
      </div>

      <AnimatePresence>
        {showDetails && status !== 'offline' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-64 p-4 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-700
                     -right-[270px] top-0"
          >
            <h3 className="text-white font-semibold mb-2">Node Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span className="text-white capitalize">{status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Cores</span>
                <span className="text-white">{metrics.cores} vCPUs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Memory</span>
                <span className="text-white">{metrics.memory} GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Temperature</span>
                <span className="text-white">{metrics.temperature}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Load Average</span>
                <span className="text-white">{metrics.loadAverage.toFixed(2)}</span>
              </div>
              
              {/* Load indicator */}
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-400 text-sm">System Load</span>
                  <span className="text-white text-sm">
                    {(metrics.loadAverage / metrics.cores * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${(metrics.loadAverage / metrics.cores * 100)}%` }}
                    role="progressbar"
                    aria-valuenow={Number((metrics.loadAverage / metrics.cores * 100).toFixed(1))}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServerNode;