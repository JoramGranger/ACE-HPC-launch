import { Cpu } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-800">
        <div className="flex items-center mr-8">
          <img 
            src="/src/assets/ace-logo.png" 
            alt="ACE Logo" 
            className="h-10 mr-2"
          />
        </div>
        <div className="flex items-center">
          <Cpu className="h-8 w-8 text-red-600 mr-2" />
          <div>
            <h1 className="text-xl font-bold text-white">ACE HPC CLUSTER</h1>
            {/* <p className="text-xs text-gray-400">HIGH PERFORMANCE COMPUTING SYSTEM</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;