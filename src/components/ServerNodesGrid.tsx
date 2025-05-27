import { useEffect, useState } from 'react';
import ServerNode from './ServerNode';

interface ServerNodesGridProps {
  nodesOnline: number;
}

const ServerNodesGrid = ({ nodesOnline }: ServerNodesGridProps) => {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  
  // Generate all 56 node IDs (1-56)
  const allNodes = Array.from({ length: 56 }, (_, i) => i + 1);
  
  // Sequential animation for node activation
  useEffect(() => {
    if (nodesOnline === 0) {
      setVisibleNodes([]);
      return;
    }
    
    // Show nodes one by one with a slight delay between them
    const interval = setInterval(() => {
      setVisibleNodes(prev => {
        const nextNode = prev.length + 1;
        if (nextNode > nodesOnline || nextNode > 56) {
          clearInterval(interval);
          return prev;
        }
        return [...prev, nextNode];
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [nodesOnline]);
  
  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-14 gap-2 overflow-hidden h-[calc(100%-2rem)]">
      {allNodes.map(nodeId => (
        <ServerNode 
          key={nodeId} 
          nodeId={nodeId}
          isActive={visibleNodes.includes(nodeId)}
        />
      ))}
    </div>
  );
};

export default ServerNodesGrid;